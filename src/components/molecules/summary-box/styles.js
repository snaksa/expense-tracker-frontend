import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        boxSizing: 'border-box',
        backgroundColor: '#FFF'
    },
    main: {
        width: '100%',
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: '6px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
    },
    header: {
        fontWeight: 'bold',
    },
    content: {
        position: 'relative',
        minHeight: '285px',
        backgroundColor: '#FFF',
        borderTop: '1px solid #f2f2f2',
    },
    noMinHeight: {
        minHeight: 0
    },
    hiddenContent: {
        display: 'none',
        border: 0
    },
    hideBorder: {
        borderTop: '0'
    }
}));

export default useStyles;
