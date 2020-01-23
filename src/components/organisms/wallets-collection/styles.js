import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    walletItem: {
        minWidth: '200px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            minWidth: 0,
            margin: '0 auto'
        }
    },
}));

export default useStyles;
