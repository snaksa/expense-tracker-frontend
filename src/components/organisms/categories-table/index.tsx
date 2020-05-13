import React, { useState, useCallback } from "react";
import { gql } from "apollo-boost";
import { Box } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  Category,
  CategoriesDocument,
  CategoriesQuery,
  useDeleteCategoryMutation,
  WalletsDocument,
  TransactionsDocument,
  CategoriesSpendingPieDocument,
  TransactionType,
  Wallet,
  TransactionSpendingFlowDocument,
  CategoriesSpendingFlowDocument,
  useWalletsQuery,
} from "api";
import useTranslations from "translations";
import { useNotificationContext } from "services/notification-provider";
import { useSharedDataContext } from "services/shared-data-provider";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import useCurrencyFormatter from "services/currency-formatter";
import Table from "components/organisms/table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Modal from "components/molecules/modal";
import CategoryForm from "components/molecules/forms/category-form";

interface Props {
  categories: Category[];
  onClick: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const CategoriesTable = ({ categories, onClick, onEdit, onDelete }: Props) => {
  const { formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const openEditModal = useCallback(() => {
    setEditModalIsOpen(true);
  }, []);
  const hideEditModal = useCallback(() => {
    setEditModalIsOpen(false);
  }, []);

  const showConfirm = useCallback(() => {
    setConfirmDeleteModalIsOpen(true);
  }, []);
  const hideConfirm = useCallback(() => {
    setConfirmDeleteModalIsOpen(true);
  }, []);

  const { setCategoryUpdate } = useUpdateDetectionContext();

  const { usedTranasctionParams } = useSharedDataContext();

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params,
      });
    }

    const mainPageCharts = [
      {
        query: CategoriesSpendingPieDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
          type: TransactionType.Expense,
        },
      },
      {
        query: CategoriesSpendingPieDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
          type: TransactionType.Income,
        },
      },
      {
        query: TransactionSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
        },
      },
      {
        query: CategoriesSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: wallets.map((wallet: Wallet) => wallet.id),
          categoryIds: [],
        },
      },
    ];

    mainPageCharts.forEach((chart: any) => {
      result.push(chart);
    });

    return result;
  };

  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted() {
      if (onDelete) {
        onDelete();
      }
      setCategoryUpdate();
      showSuccessNotification(t("Category deleted successfully!"));
    },
    onError() {
      showErrorNotification(t("An error occured while deleting the category!"));
    },
    update: (store, { data }) => {
      const category = data?.deleteCategory;

      if (!category) {
        return;
      }

      const query = {
        query: CategoriesDocument,
      };

      const cached = store.readQuery<CategoriesQuery>(query);
      if (!cached || !cached.categories) {
        return;
      }

      const result = cached.categories.filter((c) => c && c.id !== category.id);
      store.writeQuery({
        ...query,
        data: {
          categories: result,
        },
      });
    },
    refetchQueries: [
      {
        query: WalletsDocument,
      },
      ...getRefetchQueries(),
    ],
  });

  const handleDelete = useCallback(() => {
    hideConfirm();
    deleteCategory({
      variables: {
        id: selectedRow,
      },
    });
  }, [deleteCategory, hideConfirm, selectedRow]);

  const handleAction = useCallback((action: string, id: number) => {
    if (action === "delete") {
      setSelectedRow(id);
      showConfirm();
    }
    if (action === "edit") {
      setSelectedRow(id);
      setEditModalIsOpen(true);
    }
  }, [setSelectedRow, showConfirm, setEditModalIsOpen]);

  const currencyFormat = useCallback(
    (value: number) => formatCurrency(value),
    [formatCurrency]
  );
  const transactionColor = useCallback(
    (row: any) => (row.balance < 0 ? "red" : "green"),
    []
  );

  const columns = [
    {
      type: "color",
      id: "color",
      label: t("Color"),
      minWidth: 100,
      align: "center",
    },
    {
      type: "text",
      id: "name",
      label: t("Name"),
      minWidth: 100,
      align: "left",
    },
    {
      type: "number",
      id: "transactionsCount",
      label: t("Records"),
      minWidth: 100,
      align: "center",
    },
    {
      type: "number",
      id: "balance",
      label: t("Balance"),
      minWidth: 100,
      align: "center",
      prefix: "BGN",
      format: currencyFormat,
      color: transactionColor,
    },
    {
      type: "actions",
      id: "id",
      actions: [
        {
          id: "edit",
          icon: <EditIcon />,
        },
        {
          id: "delete",
          icon: <DeleteIcon />,
        },
      ],
    },
  ];

  const onComplete = useCallback(() => {
    setEditModalIsOpen(false);
    if (onEdit) {
      onEdit();
    }
  }, [onEdit]);

  return (
    <Box>
      <Table
        title={t("Categories")}
        rows={categories}
        columns={columns}
        onClick={onClick}
        onAction={handleAction}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        content={t(
          "All transactions related to this category will be removed!"
        )}
        onConfirm={handleDelete}
        onCancel={hideConfirm}
      />
      <Modal
        title={t("# Edit Category")}
        isOpen={editModalIsOpen}
        handleClose={openEditModal}
      >
        <CategoryForm
          category={
            selectedRow
              ? categories.filter(
                  (category: Category) => category.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={onComplete}
          onError={hideEditModal}
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

export default CategoriesTable;
