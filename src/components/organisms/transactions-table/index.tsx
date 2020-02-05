import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useTransactionsLazyQuery } from "../../../api";
import Table from "../table";

const TransactionsTable = ({ wallets }: { wallets: number[] }) => {
  const [getTransactions, { data }] = useTransactionsLazyQuery();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentLimit, setCurrentLimit] = useState<number>(5);

  useEffect(() => {
    getTransactions({
      variables: {
        walletIds: wallets,
        page: currentPage + 1,
        limit: currentLimit
      }
    });
  }, [getTransactions, wallets, currentPage, currentLimit]);

  const transactions: any = data?.transactions?.data ?? [];

  return (
    <Table
      rows={transactions}
      columns={columns}
      hasPagination={true}
      currentPage={currentPage}
      currentLimit={currentLimit}
      totalResults={data?.transactions?.totalResults ?? 0}
      onPageChange={(newPage: number) => {
        setCurrentPage(newPage);
      }}
      onLimitChange={(limit: number) => {
        setCurrentLimit(limit);
        setCurrentPage(0);
      }}
    />
  );
};

TransactionsTable.fragment = gql`
  query Transactions($walletIds: [Int], $page: Int, $limit: Int) {
    transactions(input: { walletIds: $walletIds, page: $page, limit: $limit }) {
      data {
        id
        description
        type
        value
        date
        wallet {
          id
          name
          color
        }
        category {
          id
          name
          color
        }
      }
      currentPage
      totalPages
      totalResults
      hasNextPage
      hasPrevPage
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
    format: (value: number) => value.toFixed(2)
  },
  {
    type: "object",
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left"
  },
  {
    type: "icon",
    id: "type",
    label: "Type",
    minWidth: 100,
    align: "left"
  },
  {
    type: "object",
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
  }
];

export default TransactionsTable;
