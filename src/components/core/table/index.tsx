import React, { useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Table as MaterialTable,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Title from "components/core/title";
import Button from "components/core/button";
import TableHead from "./table-head";
import TableBody from "./table-body";
import useStyles from "./styles";

interface Props {
  title?: string;
  rows: any;
  columns: any[];
  hasPagination?: boolean;
  totalResults?: number;
  currentPage?: number;
  currentLimit?: number;
  onPageChange?: Function;
  onLimitChange?: Function;
  onClick?: Function;
  onAction?: Function;
}

const Table: React.FunctionComponent<Props> = ({
  title,
  rows,
  columns,
  hasPagination,
  totalResults,
  currentPage,
  currentLimit,
  onPageChange,
  onLimitChange,
  onClick,
  onAction,
}: Props) => {
  const classes = useStyles();

  const pageChange = useCallback(
    (event: unknown, newPage: number) => {
      if (onPageChange) {
        onPageChange(newPage, event);
      }
    },
    [onPageChange]
  );

  const limitChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onPageChange) {
        onPageChange(0);
      }
      if (onLimitChange) {
        onLimitChange(event.target.value);
      }
    },
    [onPageChange, onLimitChange]
  );

  return (
    <Box>
      <Paper>
        <TableContainer className={classes.main}>
          <Box className={classes.header} p={4}>
            <Grid container justify="space-between">
              <Grid item>
                <Title variant="h5">{title}</Title>
              </Grid>
              <Grid item>
                {onClick && (
                  <Box>
                    <Button onClick={onClick}>
                      <AddIcon fontSize={"small"} />
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          <MaterialTable stickyHeader aria-label="sticky table">
            <TableHead columns={columns} />
            <TableBody rows={rows} columns={columns} onAction={onAction} />
          </MaterialTable>
        </TableContainer>
        {hasPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalResults ?? 0}
            rowsPerPage={currentLimit ?? 0}
            page={currentPage ?? 0}
            onChangePage={pageChange}
            onChangeRowsPerPage={limitChange}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Table;
