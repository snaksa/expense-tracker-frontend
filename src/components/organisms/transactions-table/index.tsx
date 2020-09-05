import React, { useState, useEffect, useRef, useCallback } from "react";
import { gql } from "apollo-boost";
import { Box } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import {
  Transaction,
  TransactionType,
  useDeleteTransactionMutation,
  useTransactionsLazyQuery,
  TransactionsDocument,
  CategoriesSpendingPieDocument,
  TransactionSpendingFlowDocument,
  CategoriesSpendingFlowDocument,
} from "api";
import useTranslations from "translations";
import { useSharedDataContext } from "services/shared-data-provider";
import useCurrencyFormatter from "services/currency-formatter";
import { useNotificationContext } from "services/notification-provider";
import Table from "components/organisms/table";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Modal from "components/molecules/modal";
import TransactionFormWrapper from "components/molecules/forms/transaction-form";
import DateUtils from "utils/dateUtils";

interface Props {
  startDate: string;
  endDate: string;
  walletIds?: number[];
  cateogryIds?: number[];
  onNewClick?: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const TransactionsTable = ({
  startDate,
  endDate,
  walletIds,
  cateogryIds,
  onNewClick,
  onDelete,
  onEdit,
}: Props) => {
  const { formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(10);

  const oldData: any = useRef([]);
  const [getTransactions, { data, loading }] = useTransactionsLazyQuery();

  const showDeleteModal = useCallback(
    () => setConfirmDeleteModalIsOpen(true),
    []
  );
  const hideDeleteModal = useCallback(
    () => setConfirmDeleteModalIsOpen(false),
    []
  );

  const showEditModal = useCallback(() => setEditModalIsOpen(true), []);
  const hideEditModal = useCallback(() => setEditModalIsOpen(false), []);

  if (data?.transactions?.data) {
    oldData.current = data;
  }

  const responseData: any = !loading ? data : oldData.current;

  const {
    showSuccessNotification,
    showErrorNotification,
  } = useNotificationContext();

  const {
    usedTranasctionParams,
    setTransactionUsedParams,
  } = useSharedDataContext();

  useEffect(() => {
    setCurrentPage(0);
  }, [startDate, endDate]);

  useEffect(() => {
    const params = {
      startDate: startDate,
      endDate: endDate,
      timezone: DateUtils.getTimezone(),
      walletIds: walletIds ?? [],
      categoryIds: cateogryIds ?? [],
      page: currentPage + 1,
      limit: currentLimit,
      unlimited: false,
    };

    getTransactions({
      variables: params,
    });
    const used: any = usedTranasctionParams;
    if (!used.has(params)) {
      used.add(params);
      setTransactionUsedParams(used);
    }
  }, [
    getTransactions,
    walletIds,
    cateogryIds,
    startDate,
    endDate,
    currentLimit,
    currentPage,
    usedTranasctionParams,
    setTransactionUsedParams,
  ]);

  const transactionsData: any = responseData?.transactions ?? [];
  const transactions: any = transactionsData.data ?? [];

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
          walletIds: walletIds,
          categoryIds: [],
          type: TransactionType.Expense,
        },
      },
      {
        query: CategoriesSpendingPieDocument,
        variables: {
          date: null,
          walletIds: walletIds,
          categoryIds: [],
          type: TransactionType.Income,
        },
      },
      {
        query: TransactionSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: walletIds,
          categoryIds: [],
        },
      },
      {
        query: CategoriesSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: walletIds,
          categoryIds: [],
        },
      },
    ];

    mainPageCharts.forEach((chart: any) => {
      result.push(chart);
    });

    return result;
  };

  const [deleteTransaction] = useDeleteTransactionMutation({
    onCompleted() {
      showSuccessNotification(t("Record deleted successfully!"));
      if (onDelete) {
        onDelete();
      }
    },
    onError() {
      showErrorNotification(t("An error occured while deleting the record!"));
    },
    refetchQueries: getRefetchQueries(),
  });

  const handleDelete = useCallback(() => {
    hideDeleteModal();
    deleteTransaction({
      variables: {
        id: selectedRow,
      },
    });
  }, [deleteTransaction, hideDeleteModal, selectedRow]);

  const handleAction = useCallback(
    (action: string, id: number) => {
      if (action === "delete") {
        setSelectedRow(id);
        showDeleteModal();
      }
      if (action === "edit") {
        setSelectedRow(id);
        showEditModal();
      }
    },
    [setSelectedRow, showEditModal, showDeleteModal]
  );

  const currencyFormat = useCallback((value: number) => formatCurrency(value), [
    formatCurrency,
  ]);

  const transactionColor = useCallback(
    (row: any) =>
      [TransactionType.Expense, TransactionType.Transfer].includes(row.type)
        ? "red"
        : "green",
    []
  );

  const transactionSign = useCallback(
    (row: any) =>
      [TransactionType.Expense, TransactionType.Transfer].includes(row.type)
        ? "-"
        : "",
    []
  );

  const columns = [
    {
      type: "text",
      id: "description",
      label: t("Description"),
      minWidth: 70,
      align: "left",
    },
    {
      type: "number",
      id: "value",
      label: t("Amount"),
      minWidth: 50,
      align: "right",
      format: currencyFormat,
      color: transactionColor,
      sign: transactionSign,
    },
    {
      type: "colorName",
      id: "category",
      label: t("Category"),
      minWidth: 100,
      align: "left",
    },
    {
      type: "colorName",
      id: "wallet",
      label: t("Wallet"),
      minWidth: 100,
      align: "left",
    },
    {
      type: "date",
      id: "date",
      label: t("Date"),
      minWidth: 100,
      align: "left",
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

  const onPageChange = useCallback((page: number) => setCurrentPage(page), []);
  const onLimitChange = useCallback(
    (limit: number) => setCurrentLimit(limit),
    []
  );

  const onComplete = useCallback(() => {
    hideEditModal();
    if (onEdit) {
      onEdit();
    }
  }, [onEdit, hideEditModal]);

  return (
    <Box>
      <Table
        title={t("Records")}
        rows={transactions}
        columns={columns}
        onClick={onNewClick}
        onAction={handleAction}
        hasPagination={true}
        totalResults={transactionsData?.totalResults ?? 0}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={t("Are you sure?")}
        content={t("Are you sure you want to remove this transaction?")}
        onConfirm={handleDelete}
        onCancel={hideDeleteModal}
      />
      <Modal
        title={t("# Edit Transaction")}
        isOpen={editModalIsOpen}
        handleClose={hideEditModal}
      >
        <TransactionFormWrapper
          transaction={
            selectedRow
              ? transactions.filter(
                  (transaction: Transaction) => transaction.id === selectedRow
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

TransactionsTable.fragment = gql`
  mutation DeleteTransaction($id: Int!) {
    deleteTransaction(input: { id: $id }) {
      id
      wallet {
        id
        name
        color
        amount
      }
      walletReceiver {
        id
        name
        color
        amount
      }
      category {
        id
        name
        color
        balance
        transactionsCount
      }
    }
  }
  mutation UpdateTransaction(
    $id: Int!
    $date: String
    $description: String
    $value: Float
    $type: TransactionType
    $categoryId: Int
    $walletId: Int
    $walletReceiverId: Int
  ) {
    updateTransaction(
      input: {
        id: $id
        date: $date
        description: $description
        value: $value
        type: $type
        categoryId: $categoryId
        walletId: $walletId
        walletReceiverId: $walletReceiverId
      }
    ) {
      id
      description
      value
      type
      date
      wallet {
        id
        name
        color
        amount
      }
      walletReceiver {
        id
        name
        color
        amount
      }
      category {
        id
        name
        color
        balance
        transactionsCount
      }
    }
  }
`;

export default TransactionsTable;
