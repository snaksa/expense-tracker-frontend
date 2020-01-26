import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        cursor: 'pointer',
        color: '#FFF',
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
}));

export default useStyles;
