import React from 'react';
import TableBodyMaterial from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '../../atoms/table-cell';

const TableBody = ({ rows, columns }) => {
  return (
    <TableBodyMaterial>
      {
        rows.map(row => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map(column => {
                const value = row[column.id];
                return <TableCell column={column} value={value}></TableCell>
              })
              }
            </TableRow>
          )
        })
      }
    </TableBodyMaterial>
  );
}

export default TableBody;
