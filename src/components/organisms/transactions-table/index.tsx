import React, { useState, useEffect } from "react";
import {
  Transaction,
  TransactionType,
  Wallet,
  useDeleteTransactionMutation,
  useWalletsQuery,
  useTransactionsLazyQuery,
  TransactionsDocument
} from "api";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import Table from "../table";
import { useNotificationContext } from "services/notification-provider";
import { gql } from "apollo-boost";
import { Box } from "@material-ui/core";
import ConfirmationDialog from "components/molecules/confirmation-dialog";
import Modal from "components/molecules/modal";
import TransactionForm from "../transaction-form";

interface Props {
  onNewClick?: Function;
}

const TransactionsTable = ({ onNewClick }: Props) => {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(
    false
  );
  const [selectedRow, setSelectedRow] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(10);
  // const [usedParams, setUsedParams] = useState(new Set());

  const [getTransactions, { data }] = useTransactionsLazyQuery();

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const {
    showSuccessNotification,
    showErrorNotification,
    setTransactionUsedParams,
    getTransactionUsedParams
  } = useNotificationContext();

  const usedParams = getTransactionUsedParams();

  useEffect(() => {
    const params = {
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      page: currentPage + 1,
      limit: currentLimit,
      unlimited: false
    };

    getTransactions({
      variables: params
    });
    const used: any = usedParams;
    if (!used.has(params)) {
      used.add(params);
      setTransactionUsedParams(used);
    }
  }, [getTransactions, wallets, currentLimit, currentPage, usedParams, setTransactionUsedParams]);

  const transactionsData: any = data?.transactions ?? [];
  const transactions: any = transactionsData.data ?? [];

  const getRefetchQueries = () => {
    const result: any = [];
    for (let params of usedParams) {
      result.push({
        query: TransactionsDocument,
        variables: params
      });
    }

    return result;
  };

  const [deleteTransaction] = useDeleteTransactionMutation({
    onCompleted() {
      showSuccessNotification("Record deleted successfully!");
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
        <TransactionForm
          wallets={wallets}
          transaction={
            selectedRow
              ? transactions.filter(
                  (transaction: Transaction) => transaction.id === selectedRow
                )[0]
              : undefined
          }
          onComplete={() => setEditModalIsOpen(false)}
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
    $description: String
    $value: Float
    $type: TransactionType
    $categoryId: Int
    $walletId: Int
  ) {
    updateTransaction(
      input: {
        id: $id
        description: $description
        value: $value
        type: $type
        categoryId: $categoryId
        walletId: $walletId
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

const columns = [
  {
    type: "text",
    id: "description",
    label: "Description",
    minWidth: 100,
    align: "left"
  },
  {
    type: "number",
    id: "value",
    label: "Amount",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
    color: (row: any) =>
      row.type === TransactionType.Expense ? "red" : "green",
    sign: (row: any) =>
      row.type === TransactionType.Expense ? "-BGN " : "BGN "
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
    type: "text",
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

export default TransactionsTable;
