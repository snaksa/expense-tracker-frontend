import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cell: {
        backgroundColor: '#FFF'
    },
    icons: {
        color: '#CCC'
    },
    icon: {
        margin: '0 5',
        cursor: 'pointer',
        "&:hover": {
            color: theme.palette.primary.main
        }
    }
}));

export default useStyles;
