import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        boxSizing: 'border-box'
    },
    main: {
        width: '100%',
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: '6px',
        boxSizing: 'border-box'
    },
    header: {
        fontWeight: 'bold',
        borderBottom: '1px solid #f2f2f2',
    },
    content: {

    }
}));

export default useStyles;
