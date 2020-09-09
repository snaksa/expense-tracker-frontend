import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: theme.shadows[5],
        minWidth: '400px',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
            minWidth: '0px',
        }
    },
    header: {
        padding: 5,
        backgroundColor: theme.palette.primary.main,
        color: '#FFF'
    },
    content: {
        padding: 10,
        backgroundColor: '#f2f2f2'
    }
}));

export default useStyles;
