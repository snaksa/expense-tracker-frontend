import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    mobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    desktop: {
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

export default useStyles;
