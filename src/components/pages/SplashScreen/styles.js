import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        fontSize: 40,
        color: `${theme.palette.primary.main}`,
        fontWeight: 'bold'
    },
}));

export default useStyles;
