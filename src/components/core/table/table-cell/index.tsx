import React from "react";
import {
  Grid,
  Box,
  PropTypes,
  Icon,
  TableCell as TableCellMaterial,
} from "@material-ui/core";
import { TrendingDown, TrendingUp } from "@material-ui/icons";
import { TransactionType } from "api";
import formatDate from "services/date-formatter";
import RoundBox from "components/core/round-box";
import useStyles from "./styles";

export interface Props {
  row?: any;
  value: any;
  column: {
    id: string;
    type: string;
    align?: PropTypes.Alignment;
    format?: Function;
    color?: Function;
    sign?: Function;
    includeSign?: boolean;
    actions?: {
      id: string;
      icon: any;
    }[];
  };
  onAction?: Function;
}

const TableCell: React.FunctionComponent<Props> = ({
  row,
  value,
  column,
  onAction,
}: Props): JSX.Element => {
  const classes = useStyles();

  if (["number", "text"].includes(column.type)) {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
        style={{ color: column.color && row && column.color(row) }}
      >
        {column.type === "number" && column.sign && row && column.sign(row)}
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
            <Box
              p={1}
              width={0}
              style={{ backgroundColor: value?.color }}
            ></Box>
          </Grid>
          <Grid item>{value?.name ? value.name : ""}</Grid>
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

  if (column.type === "date") {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
        {formatDate(value)}
      </TableCellMaterial>
    );
  }

  if (column.type === "colorName") {
    return (
      <TableCellMaterial
        key={column.id}
        align={column.align}
        className={classes.cell}
      >
        {row &&
        row.type === TransactionType.Transfer &&
        column.id === "category" ? (
          <Grid container spacing={1} alignItems="center" justify="flex-start">
            <Grid item>
              <RoundBox
                width={15}
                height={15}
                color={row.wallet?.color ?? "#ccc"}
              />
            </Grid>
            <Grid item>{row.wallet?.name ?? "Unknown"}</Grid>
            <Grid item> - </Grid>
            <Grid item>
              <RoundBox
                width={15}
                height={15}
                color={row.walletReceiver?.color ?? "#ccc"}
              />
            </Grid>
            <Grid item>{row.walletReceiver?.name ?? "Unknown"}</Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} alignItems="center" justify="flex-start">
            <Grid item>
              <RoundBox width={15} height={15} color={value?.color ?? "#ccc"} />
            </Grid>
            <Grid item>{value?.name ?? "Unknown"}</Grid>
          </Grid>
        )}
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
              key={action.id}
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
