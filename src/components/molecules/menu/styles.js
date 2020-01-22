import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
}));

export default useStyles;
