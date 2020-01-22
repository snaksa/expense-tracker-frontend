import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import TableBodyMaterial from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableHead = ({ rows, columns }) => {
  return (
    <TableBodyMaterial>
      {rows.map(row => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map(column => {
              const value = row[column.id];
              return column.id === 'category' ?
                <TableCell key={column.id} align={column.align}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Box p={1} width={0} style={{ backgroundColor: value.color }}></Box>
                    </Grid>
                    <Grid item>
                      {value.name}
                    </Grid>
                  </Grid>

                </TableCell>
                :
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number' ? column.format(value) : value}
                </TableCell>;
            })}
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
}

export default TableHead;
