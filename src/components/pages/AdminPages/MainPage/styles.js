import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: 10,
        }
    },
    transactions: {
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
}));

export default useStyles;
