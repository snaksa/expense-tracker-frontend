import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        color: '#000',
        borderRadius: 5,
        border: '1px solid #ccc',
        overflow: 'hidden',
        cursor: 'pointer'
    },
}));

export default useStyles;
