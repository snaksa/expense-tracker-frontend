import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    hero: {
        width: '100%',
        padding: 100,
        [theme.breakpoints.down('sm')]: {
            padding: 10,
            paddingTop: 20,
        }
    },
    heading: {
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '90%'
        }
    }
}));

export default useStyles;
