import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: 10,
        }
    },
    collection: {
        backgroundColor: "#FFF"
    },
    transactions: {
        height: '100%',
        backgroundColor: '#FFF',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
}));

export default useStyles;
