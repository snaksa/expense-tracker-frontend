import React from "react";
import {
  Box,
  Grid,
  Paper,
  Table as MaterialTable,
  TableContainer,
  TablePagination
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import useStyles from "./styles";
import TableHead from "../../molecules/table-head";
import TableBody from "../../molecules/table-body";
import Title from "components/atoms/title";
import Button from "components/atoms/button";

interface Props {
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
  rows,
  columns,
  hasPagination,
  totalResults,
  currentPage,
  currentLimit,
  onPageChange,
  onLimitChange,
  onClick,
  onAction
}: Props) => {
  const classes = useStyles();

  return (
    <Box>
      <Paper>
        <TableContainer className={classes.main}>
          <Box className={classes.header} p={4}>
            <Grid container justify='space-between'>
              <Grid item>
                <Title variant="h5">Categories</Title>
              </Grid>
              <Grid item>
                <Box>
                  <Button onClick={onClick}>
                    <AddIcon fontSize={"small"} />
                  </Button>
                </Box>
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
