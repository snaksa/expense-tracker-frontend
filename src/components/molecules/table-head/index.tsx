import React, { useMemo } from "react";
import { TableHead as TableHeadMaterial, TableRow } from "@material-ui/core";
import TableCell from "components/atoms/table-cell";

interface Props {
  columns: any[];
}

const TableHead: React.FunctionComponent<Props> = ({
  columns,
}: Props): JSX.Element => {
  const headCells = useMemo(
    () =>
      columns.map((column) => {
        return { ...column, type: "text", value: column.label };
      }),
    [columns]
  );

  return (
    <TableHeadMaterial>
      <TableRow>
        {headCells.map((column, index) => {
          return <TableCell key={index} column={column} value={column.value} />;
        })}
      </TableRow>
    </TableHeadMaterial>
  );
};

export default TableHead;
