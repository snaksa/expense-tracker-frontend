import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: '#262626',
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
}));

export default useStyles;
