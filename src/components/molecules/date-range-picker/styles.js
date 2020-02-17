import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: "300px",
        padding: 20,
        backgroundColor: "#FFF",
        borderRadius: 4,
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    }
}));

export default useStyles;
