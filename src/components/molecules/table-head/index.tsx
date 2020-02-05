import React from "react";
import TableHeadMaterial from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "../../atoms/table-cell";

interface Props {
  columns: any[];
}

const TableHead: React.FunctionComponent<Props> = ({
  columns
}: Props): JSX.Element => {
  const headCells = columns.map(column => {
    return { ...column, type: "text", value: column.label };
  });

  return (
    <TableHeadMaterial>
      <TableRow>
        {headCells.map(column => {
          return <TableCell column={column} value={column.value} />;
        })}
      </TableRow>
    </TableHeadMaterial>
  );
};

export default TableHead;
