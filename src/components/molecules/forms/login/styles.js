import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    errorMessage: {
        textAlign: 'center',
        color: theme.palette.primary.main
    }
}));

export default useStyles;
