import React from "react";
import {
  Box,
  Paper,
  Table as MaterialTable,
  TableContainer,
  TablePagination
} from "@material-ui/core";
import useStyles from "./styles";
import TableHead from "../../molecules/table-head";
import TableBody from "../../molecules/table-body";

interface Props {
  rows: any[];
  columns: any[];
  hasPagination?: boolean;
  totalResults?: number;
  currentPage?: number;
  currentLimit?: number;
  onPageChange?: Function;
  onLimitChange?: Function;
}

const Table: React.FunctionComponent<Props> = ({
  rows,
  columns,
  hasPagination,
  totalResults,
  currentPage,
  currentLimit,
  onPageChange,
  onLimitChange
}: Props) => {
  const classes = useStyles();

  return (
    <Box>
      <Paper>
        <TableContainer className={classes.main}>
          <MaterialTable stickyHeader aria-label="sticky table">
            <TableHead columns={columns} />
            <TableBody rows={rows} columns={columns} />
          </MaterialTable>
        </TableContainer>
        {hasPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalResults ?? 0}
            rowsPerPage={currentLimit ?? 0}
            page={currentPage ?? 0}
            onChangePage={(event: unknown, newPage: number) => {
              if (onPageChange) {
                onPageChange(newPage, event);
              }
            }}
            onChangeRowsPerPage={(
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              if (onPageChange) {
                onPageChange(0);
              }
              if (onLimitChange) {
                onLimitChange(event.target.value);
              }
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Table;
