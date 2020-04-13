import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    hero: {
        padding: 50,
        boxSizing: 'border-box',
        background: `linear-gradient(0deg, #ff9ebe, 21%, ${theme.palette.primary.main} 50%)`,
        [theme.breakpoints.down('sm')]: {
            padding: 10,
            paddingTop: 20,
        }
    },
    summary: {
        backgroundColor: "#f8f8f8",
        textAlign: "center",
        lineHeight: 1.5,
        fontSize: 25,
        [theme.breakpoints.down('lg')]: {
            fontSize: 20
        }
    },
    youCanItem: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: 40
        }
    },
    youCanItemTitle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    youCanItemContent: {
        maxWidth: "300px",
        textAlign: "center"
    },
    smartGuy: {
        marginTop: 80,
        padding: 50,
        boxSizing: 'border-box',
        background: `linear-gradient(0deg, #96d8e4, 21%, #3ab7cc 50%)`,
        [theme.breakpoints.down('sm')]: {
            padding: 10,
            paddingTop: 20,
        }
    },
    smartGuyText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
        lineHeight: 1.5
    },
    tryFree: {
        marginTop: 80,
        padding: 50,
        paddingBottom: 0,
        boxSizing: 'border-box',
        background: `linear-gradient(0deg, #8bd5d4, 21%, #3ca5a3 50%)`,
        [theme.breakpoints.down('sm')]: {
            padding: 10,
            paddingTop: 20,
            paddingBottom: 0
        }
    },
    tryNow: {
        color: theme.palette.primary.main,
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        "&:hover": {
            background: '#FFF'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
}));

export default useStyles;
