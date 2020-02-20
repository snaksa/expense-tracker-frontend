import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        background: `linear-gradient(0deg, rgba(200, 246, 255, 1) 32%, ${theme.palette.primary.main} 81%)`,
    }
}));

export default useStyles;
