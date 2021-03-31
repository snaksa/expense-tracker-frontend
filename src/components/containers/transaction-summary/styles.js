import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        borderBottom: '1px solid #f2f2f2',
    },
    main: {
        width: '100%',
        height: '40px',
        color: '#000',
        backgroundColor: '#FFF',
    },
    top: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    bottom: {
        fontSize: 12
    }
}));

export default useStyles;
