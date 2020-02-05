import React from "react";
import TableCellMaterial from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TrendingDown from "@material-ui/icons/TrendingDown";
import TrendingUp from "@material-ui/icons/TrendingUp";
import { TransactionType } from "api";
import { PropTypes } from "@material-ui/core";

export interface Props {
  value: any;
  column: {
    id: string;
    type: string;
    align?: PropTypes.Alignment;
    format?: Function;
  };
}

const TableCell: React.FunctionComponent<Props> = ({
  value,
  column
}): JSX.Element => {
  if (["number", "text"].includes(column.type)) {
    return (
      <TableCellMaterial key={column.id} align={column.align}>
        {column.format && column.type === "number"
          ? column.format(value)
          : value}
      </TableCellMaterial>
    );
  }

  if (column.type === "icon") {
    return (
      <TableCellMaterial key={column.id} align={column.align}>
        {value === TransactionType.Expense && (
          <TrendingDown fontSize="small" style={{ color: "red" }} />
        )}
        {value === TransactionType.Income && (
          <TrendingUp fontSize="small" style={{ color: "green" }} />
        )}
      </TableCellMaterial>
    );
  }

  if (column.type === "object") {
    return (
      <TableCellMaterial key={column.id} align={column.align}>
        <Grid container spacing={1}>
          <Grid item>
            <Box p={1} width={0} style={{ backgroundColor: value.color }}></Box>
          </Grid>
          <Grid item>{value.name ? value.name : ""}</Grid>
        </Grid>
      </TableCellMaterial>
    );
  }

  return <Box></Box>;
};

export default TableCell;
