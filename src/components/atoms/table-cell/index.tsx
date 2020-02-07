import React from "react";
import TableCellMaterial from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TrendingDown from "@material-ui/icons/TrendingDown";
import TrendingUp from "@material-ui/icons/TrendingUp";
import { TransactionType } from "api";
import { PropTypes, Icon } from "@material-ui/core";
import useStyles from "./styles";
import RoundBox from "../round-box";
import { StringValueNode } from "graphql";

export interface Props {
  value: any;
  column: {
    id: string;
    type: string;
    align?: PropTypes.Alignment;
    format?: Function;
    actions?: {
      id: StringValueNode;
      icon: any;
    }[];
  };
  onAction?: Function;
}

const TableCell: React.FunctionComponent<Props> = ({
  value,
  column,
  onAction
}: Props): JSX.Element => {
  const classes = useStyles();

  if (["number", "text"].includes(column.type)) {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
        {column.format && column.type === "number"
          ? column.format(value)
          : value}
      </TableCellMaterial>
    );
  }

  if (column.type === "icon") {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
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
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Box p={1} width={0} style={{ backgroundColor: value.color }}></Box>
          </Grid>
          <Grid item>{value.name ? value.name : ""}</Grid>
        </Grid>
      </TableCellMaterial>
    );
  }

  if (column.type === "color") {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
        <RoundBox width={20} height={20} color={value} centered={true} />
      </TableCellMaterial>
    );
  }

  if (column.type === "actions") {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={`${classes.cell} ${classes.icons}`}
      >
        {column.actions &&
          column.actions.map((action: any) => (
            <Icon
              className={classes.icon}
              onClick={() => (onAction ? onAction(action.id, value) : "")}
            >
              {action.icon}
            </Icon>
          ))}
      </TableCellMaterial>
    );
  }

  return <Box></Box>;
};

export default TableCell;
