import React, { useState, useEffect, useRef } from "react";
import {
  Transaction,
  TransactionType,
  useDeleteTransactionMutation,
  useTransactionsLazyQuery,
  TransactionsDocument,
  CategoriesSpendingPieDocument,
  TransactionSpendingFlowDocument,
  CategoriesSpendingFlowDocument
} from "api";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Table from "../table";
import { useNotificationContext } from "services/notification-provider";
import { gql } from "apollo-boost";
import { Box } from "@material-ui/core";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Modal from "components/molecules/modal";
import { useSharedDataContext } from "services/shared-data-provider";
import useCurrencyFormatter from "services/currency-formatter";
import TransactionFormWrapper from "components/molecules/forms/transaction-form";

interface Props {
  selectedDate: string;
  walletIds?: number[];
  cateogryIds?: number[];
  onNewClick?: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const TransactionsTable = ({
  selectedDate,
  walletIds,
  cateogryIds,
  onNewClick,
  onDelete,
  onEdit
}: Props) => {
  const { formatCurrency } = useCurrencyFormatter();
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(10);

  const oldData: any = useRef([]);
  const [getTransactions, { data, loading }] = useTransactionsLazyQuery();

  if (data?.transactions?.data) {
    oldData.current = data;
  }

  const responseData: any = !loading ? data : oldData.current;

  const {
    showSuccessNotification,
    showErrorNotification
  } = useNotificationContext();

  const {
    usedTranasctionParams,
    setTransactionUsedParams
  } = useSharedDataContext();

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedDate]);

  useEffect(() => {
    const params = {
      date: selectedDate,
      walletIds: walletIds ?? [],
      categoryIds: cateogryIds ?? [],
      page: currentPage + 1,
      limit: currentLimit,
      unlimited: false
    };

    getTransactions({
      variables: params
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
    selectedDate,
    currentLimit,
    currentPage,
    usedTranasctionParams,
    setTransactionUsedParams
  ]);

  const transactionsData: any = responseData?.transactions ?? [];
  const transactions: any = transactionsData.data ?? [];

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedTranasctionParams) {
      result.push({
        query: TransactionsDocument,
        variables: params
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
          categoryIds: []
        }
      },
      {
        query: CategoriesSpendingFlowDocument,
        variables: {
          date: null,
          walletIds: walletIds,
          categoryIds: []
        }
      }
    ];

    mainPageCharts.forEach((chart: any) => {
      result.push(chart);
    });

    return result;
  };

  const [deleteTransaction] = useDeleteTransactionMutation({
    onCompleted() {
      showSuccessNotification("Record deleted successfully!");
      if (onDelete) {
        onDelete(); 
      }
    },
    onError() {
      showErrorNotification("An error occured while deleting the record!");
    },
    refetchQueries: getRefetchQueries()
  });

  const handleDelete = () => {
    setConfirmDeleteModalIsOpen(false);
    deleteTransaction({
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

  const columns = [
    {
      type: "text",
      id: "description",
      label: "Description",
      minWidth: 70,
      align: "left"
    },
    {
      type: "number",
      id: "value",
      label: "Amount",
      minWidth: 50,
      align: "right",
      format: (value: number) => formatCurrency(value),
      color: (row: any) =>
        [TransactionType.Expense, TransactionType.Transfer].includes(row.type)
          ? "red"
          : "green",
      sign: (row: any) =>
        [TransactionType.Expense, TransactionType.Transfer].includes(row.type)
          ? "-"
          : ""
    },
    {
      type: "colorName",
      id: "category",
      label: "Category",
      minWidth: 100,
      align: "left"
    },
    {
      type: "colorName",
      id: "wallet",
      label: "Wallet",
      minWidth: 100,
      align: "left"
    },
    {
      type: "date",
      id: "date",
      label: "Date",
      minWidth: 100,
      align: "left"
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

  return (
    <Box>
      <Table
        title="Records"
        rows={transactions}
        columns={columns}
        onClick={onNewClick}
        onAction={handleAction}
        hasPagination={true}
        totalResults={transactionsData?.totalResults ?? 0}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={(page: number) => setCurrentPage(page)}
        onLimitChange={(limit: number) => setCurrentLimit(limit)}
      />
      <ConfirmationDialog
        isOpen={confirmDeleteModalIsOpen}
        title={"Are you sure?"}
        content={"Are you sure you want to remove this transaction?"}
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
        <TransactionFormWrapper
          transaction={
            selectedRow
              ? transactions.filter(
                  (transaction: Transaction) => transaction.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={() => {
            setEditModalIsOpen(false);
            if (onEdit) {
              onEdit();
            }
          }}
          onError={() => setEditModalIsOpen(false)}
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
