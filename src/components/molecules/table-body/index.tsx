import React, { useMemo } from "react";
import { TableHead as TableBodyMaterial, TableRow } from "@material-ui/core";
import TableCell from "components/atoms/table-cell";

interface Props {
  rows: any;
  columns: any;
  onAction?: Function;
}

const TableBody: React.FunctionComponent<Props> = ({
  rows,
  columns,
  onAction,
}: Props): JSX.Element => {
  const renderRows = useMemo(
    () =>
      rows.map((row: any, index: number) => (
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
      )),
    [rows, columns, onAction]
  );

  return <TableBodyMaterial>{renderRows}</TableBodyMaterial>;
};

export default TableBody;
