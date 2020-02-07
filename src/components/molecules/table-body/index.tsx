import React from "react";
import { TableHead as TableBodyMaterial, TableRow } from "@material-ui/core";
import TableCell from "../../atoms/table-cell";

interface Props {
  rows: any;
  columns: any;
  onAction?: Function;
}

const TableBody: React.FunctionComponent<Props> = ({
  rows,
  columns,
  onAction
}: Props): JSX.Element => {
  return (
    <TableBodyMaterial>
      {rows.map((row: any) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column: any) => {
              const value = row[column.id];
              return (
                <TableCell
                  column={column}
                  value={value}
                  onAction={onAction}
                ></TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
};

export default TableBody;
