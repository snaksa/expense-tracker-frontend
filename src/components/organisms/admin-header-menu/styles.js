import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        color: theme.palette.primary.secondary,
        padding: 10,
        borderBottom: '1px solid #f2f2f2',
        backgroundImage: 'linear-gradient(to right, rgb(41, 48, 62, 1) 0%, rgba(233, 30, 99,1) 50%)',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: theme.palette.primary.main,
            backgroundImage: 'none'
        }
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
