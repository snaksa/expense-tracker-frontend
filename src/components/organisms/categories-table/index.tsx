import React, { useState } from "react";
import { Box } from "@material-ui/core";
import {
  Category,
  CategoriesDocument,
  CategoriesQuery,
  useDeleteCategoryMutation
} from "api";
import Table from "../table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import { useNotificationContext } from "services/notification-provider";
import { gql } from "apollo-boost";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Modal from "components/molecules/modal";
import CategoryForm from "../category-form";

interface Props {
  categories: Category[];
  onClick: Function;
}

const CategoriesTable = ({ categories, onClick }: Props) => {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted() {
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
    }
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
          category={selectedRow ? categories.filter((category: Category) => category.id === selectedRow)[0] : undefined}
          onComplete={() => setEditModalIsOpen(false)}
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
    type: "text",
    id: "id",
    label: "Records",
    minWidth: 100,
    align: "center"
  },
  {
    type: "text",
    id: "id",
    label: "Spend",
    minWidth: 100,
    align: "center"
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
