import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        color: theme.palette.primary.main,
        padding: 10,
        borderBottom: '1px solid #f2f2f2',
        backgroundColor: theme.palette.primary.main,
    },
    sidebar: {
        backgroundColor: theme.palette.secondary.main,
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
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
