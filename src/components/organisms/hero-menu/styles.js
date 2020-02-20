import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        paddingRight: 12,
        [theme.breakpoints.down('sm')]: {
            paddingRight: 5,
        }
    },
    main: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        marginTop: 30,
        height: 50,
        [theme.breakpoints.down('sm')]: {
            marginTop: 10
        }
    },
    link: {
        textDecoration: 'none',
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        boxSizing: 'border-box',
        color: '#FFF'
    },
    active: {
        color: '#000',
        backgroundColor: '#FFF',
    }
}));

export default useStyles;
