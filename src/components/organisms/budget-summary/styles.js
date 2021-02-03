import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    box: {
        marginBottom: '16px',
        cursor: 'pointer'
    },
    main: {
        width: '100%',
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 5,
        border: '1px solid #CCC',
        overflow: 'hidden',
        '&:hover': {
            '& $icon': {
                visibility: 'visible'
            }
        }
    },
    content: {
        padding: 8
    },
    header: {
        borderBottom: '1px solid #CCC'
    },
    headerGrid: {
        alignItems: 'center'
    },
    icon: {
        marginLeft: 5,
        visibility: 'hidden',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            visibility: 'visible'
        }
    },
    checkbox: {
        padding: 5,
        color: theme.palette.primary.main,
        backgroundColor: '#FFF',
        '&&:hover': {
            backgroundColor: '#FFF',
        },
    }
}));

export default useStyles;
