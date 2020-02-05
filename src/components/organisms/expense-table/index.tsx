import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "../../molecules/table-head";
import TableBody from "../../molecules/table-body";
import { gql } from "apollo-boost";
import { useTransactionsLazyQuery } from "../../../api";
import { Paper } from "@material-ui/core";

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
    <Box>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead columns={columns} />
            <TableBody rows={transactions} columns={columns} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data?.transactions?.totalResults ?? 0}
          rowsPerPage={currentLimit}
          page={currentPage}
          onChangePage={(event: unknown, newPage: number) => {console.log(event); setCurrentPage(newPage)}}
          onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentLimit(+event.target.value);
            setCurrentPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

ExpenseTable.fragment = gql`
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

export default ExpenseTable;
