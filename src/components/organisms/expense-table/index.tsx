import React, { useEffect } from "react";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "../../molecules/table-head";
import TableBody from "../../molecules/table-body";
import { gql } from "apollo-boost";
import { useTransactionsLazyQuery } from "../../../api";

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

const ExpenseTable = ({ wallets }: { wallets: number[] }) => {
  const classes = useStyles();

  const [getTransactions, { data }] = useTransactionsLazyQuery();

  useEffect(() => {
    getTransactions({ variables: { walletIds: wallets } });
  }, [getTransactions, wallets]);

  const transactions: any = data
  ? data.transactions
    ? data.transactions
    : []
  : [];

  return (
    <Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead columns={columns} />
          <TableBody rows={transactions} columns={columns} />
        </Table>
      </TableContainer>
    </Box>
  );
};

ExpenseTable.fragment = gql`
  query Transactions($walletIds: [Int]) {
    transactions(input: { walletIds: $walletIds }) {
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
  }
`;

export default ExpenseTable;
