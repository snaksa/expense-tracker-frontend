import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    walletItem: {
        minWidth: '200px',
        margin: 5,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minWidth: 0,
            margin: '5px auto'
        }
    },
}));

export default useStyles;
