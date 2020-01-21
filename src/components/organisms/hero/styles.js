import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '300px',
        border: `2px solid ${theme.palette.primary.main}`,
        padding: '30px',
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
            width: '90%',
            margin: '0 auto'
        }
    },
    image: {
        width: '100px',
    }
}));

export default useStyles;
