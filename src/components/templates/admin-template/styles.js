import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }
    },
}));

export default useStyles;
