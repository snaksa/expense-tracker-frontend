import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        color: theme.palette.primary.main,
        backgroundColor: '#262626',
        padding: 10,
        borderBottom: `1px solid ${theme.palette.primary.main}`
    },
    mobileMenuIcon: {
        height: '100%',
        display: 'none',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        }
    },
    logo: {
        height: '100%',
        alignItems: 'center',
        display: 'flex'
    }
}));

export default useStyles;
