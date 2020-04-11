import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    navigation: {
        zIndex: 1,
        backgroundColor: '#FFF',
        padding: 15,
        position: '-webkit - sticky', /* Safari */
        position: 'sticky',
        top: 0
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
}));

export default useStyles;
