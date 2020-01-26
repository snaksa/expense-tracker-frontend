import React from 'react';
import useStyles from './styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '../../molecules/table-head';
import TableBody from '../../molecules/table-body';

const columns = [
  {
    type: 'text',
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'left'
  },
  {
    type: 'number',
    id: 'amount',
    label: 'Amount',
    minWidth: 50,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    type: 'object',
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'left',
  },
  {
    type: 'number',
    id: 'type',
    label: 'Type',
    minWidth: 100,
    align: 'left',
  },
  {
    type: 'text',
    id: 'wallet',
    label: 'Wallet',
    minWidth: 100,
    align: 'left',
  },
];

const rows = [
  {
    description: 'Meat',
    amount: 10.99,
    category: {
      name: 'Chill',
      color: 'red'
    },
    type: 0,
    wallet: 'Bank',
  },
  {
    description: 'Paycheck',
    amount: 1000,
    category: {
      name: 'Chill',
      color: 'red'
    },
    type: 1,
    wallet: 'Edenred',
  },
  {
    description: 'Bike',
    amount: 400,
    category: {
      name: 'Chill',
      color: 'red'
    },
    type: 0,
    wallet: 'Wallet',
  },
];

const ExpenseTable = () => {
  const classes = useStyles();

  return (
    <Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead columns={columns}/>
          <TableBody rows={rows} columns={columns} />
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ExpenseTable;
