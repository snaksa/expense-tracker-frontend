import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import AdminTemplate from '../../templates/admin-template';
import ExpenseTable from '../../organisms/expense-table';
import WalletsCollection from '../../organisms/wallets-collection';
import Sidebar from '../../molecules/sidebar';
import HeaderMenu from '../../organisms/admin-header-menu';

const wallets = [
    {
        name: 'Bank',
        color: 'red',
        amount: 100.44
    },
    {
        name: 'Edenred',
        color: 'purple',
        amount: 499.21
    },
    {
        name: 'Wallet',
        color: 'green',
        amount: 23.84
    },
];

const AdminPage = () => {
    const classes = useStyles();
    return (
        <AdminTemplate
            header={<HeaderMenu />}
            sidebar={<Sidebar options={[{ label: 'Home' }, { label: 'Categories' }, { label: 'Stats' }, { label: 'Settings' }]} />}
            content={
                <Box className={classes.main} p={2}>
                    <Grid direction="column">
                        <Grid item>
                            <WalletsCollection wallets={wallets} />
                        </Grid>
                        <Grid item>
                            <Box className={classes.expenses}>
                                <ExpenseTable />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    );
}

export default AdminPage;
