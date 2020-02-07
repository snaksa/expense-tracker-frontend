import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        cursor: 'pointer',
        color: '#FFF',      
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
    link: {
        textDecoration: 'none',  
        fontSize: 16,
        color: 'inherit'
    },
    active: {
        color: theme.palette.primary.main
    }
}));

export default useStyles;
