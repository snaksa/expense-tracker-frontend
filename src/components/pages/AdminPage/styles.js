import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '80%',
        backgroundColor: '#FFF',
        border: `2px solid ${theme.palette.primary.main}`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: 10
        }
    },
    expenses: {
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
}));

export default useStyles;
