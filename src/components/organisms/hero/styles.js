import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%'
    },
    hero: {
        width: '100%',
        background: `linear-gradient(0deg, rgba(200, 246, 255, 1) 32%, ${theme.palette.primary.main} 81%)`,
        padding: 200,
        [theme.breakpoints.down('sm')]: {
            padding: 10,
            paddingTop: 100,
        }
    },
    heading: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    form: {
        width: '400px',
        border: `2px solid ${theme.palette.primary.main}`,
        padding: '30px',
        borderRadius: '10px',
        margin: '50px auto',
        backgroundColor: '#FFF',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            margin: '70px auto'
        }
    },
    image: {
        width: '100px',
    }
}));

export default useStyles;
