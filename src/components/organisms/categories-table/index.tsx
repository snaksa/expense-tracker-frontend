import React, { useState } from "react";
import { Box } from "@material-ui/core";
import {
  Category,
  CategoriesDocument,
  CategoriesQuery,
  useDeleteCategoryMutation,
  WalletsDocument,
  TransactionsDocument
} from "api";
import Table from "../table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import { useNotificationContext } from "services/notification-provider";
import { gql } from "apollo-boost";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Modal from "components/molecules/modal";
import CategoryForm from "../category-form";
import { useSharedDataContext } from "services/shared-data-provider";

interface Props {
  categories: Category[];
  onClick: Function;
  onEdit: Function;
  onDelete: Function;
}

const CategoriesTable = ({ categories, onClick, onEdit, onDelete }: Props) => {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {
    usedTranasctionParams
  } = useSharedDataContext();

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params
      });
    }

    return result;
  };

  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted() {
      onDelete();
      showSuccessNotification("Category deleted successfully!");
    },
    onError() {
      showErrorNotification("An error occured while deleting the category!");
    },
    update: (store, { data }) => {
      const category = data?.deleteCategory;

      if (!category) {
        return;
      }

      const query = {
        query: CategoriesDocument
      };

      const cached = store.readQuery<CategoriesQuery>(query);
      if (!cached || !cached.categories) {
        return;
      }

      const result = cached.categories.filter(c => c && c.id !== category.id);
      store.writeQuery({
        ...query,
        data: {
          categories: result
        }
      });

      
    },
    refetchQueries: [
      {
        query: WalletsDocument
      },
      ...getRefetchQueries()
    ]
  });

  const handleDelete = () => {
    setConfirmDeleteModalIsOpen(false);
    deleteCategory({
      variables: {
        id: selectedRow
      }
    });
  };

  const handleAction = (action: string, id: number) => {
    if (action === "delete") {
      setSelectedRow(id);
      setConfirmDeleteModalIsOpen(true);
    }
    if (action === "edit") {
      setSelectedRow(id);
      setEditModalIsOpen(true);
    }
  };

  return (
    <Box>
      <Table
        title="Categories"
        rows={categories}
        columns={columns}
        onClick={onClick}
        onAction={handleAction}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={"Are you sure?"}
        content={"All transactions related to this category will be removed!"}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteModalIsOpen(false)}
      />
      <Modal
        title={"+ Edit Category"}
        isOpen={editModalIsOpen}
        handleClose={() => {
          setEditModalIsOpen(false);
        }}
      >
        <CategoryForm
          category={
            selectedRow
              ? categories.filter(
                  (category: Category) => category.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={() => {
            setEditModalIsOpen(false);
            onEdit();
          }}
          onError={() => setEditModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

CategoriesTable.fragment = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(input: { id: $id }) {
      id
    }
  }
  mutation UpdateCategory($id: Int!, $name: String, $color: String) {
    updateCategory(input: { id: $id, name: $name, color: $color }) {
      id
      name
      color
      icon
      transactionsCount
      balance
    }
  }
`;

const columns = [
  {
    type: "color",
    id: "color",
    label: "Color",
    minWidth: 100,
    align: "center"
  },
  {
    type: "text",
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "left"
  },
  {
    type: "number",
    id: "transactionsCount",
    label: "Records",
    minWidth: 100,
    align: "center"
  },
  {
    type: "number",
    id: "balance",
    label: "Balance",
    minWidth: 100,
    align: "center",
    prefix: "BGN",
    format: (value: number) => Math.abs(value).toFixed(2),
    color: (row: any) => (row.balance < 0 ? "red" : "green"),
    sign: (row: any) => (row.balance < 0 ? "-BGN " : "BGN ")
  },
  {
    type: "actions",
    id: "id",
    actions: [
      {
        id: "edit",
        icon: <EditIcon />
      },
      {
        id: "delete",
        icon: <DeleteIcon />
      }
    ]
  }
];

export default CategoriesTable;
