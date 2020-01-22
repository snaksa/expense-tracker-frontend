import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHeadMaterial from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableHead = ({ columns }) => {
  return (
    <TableHeadMaterial>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadMaterial>
  );
}

export default TableHead;
