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
      {rows.map((row: any, index: number) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            {columns.map((column: any) => {
              const value = row[column.id];
              return (
                <TableCell
                  key={column.id}
                  column={column}
                  value={value}
                  onAction={onAction}
                  row={row}
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
