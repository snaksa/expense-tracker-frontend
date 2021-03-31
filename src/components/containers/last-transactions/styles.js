import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    noData: {
        fontSize: 11,
        textAlign: 'center', 
        paddingTop: '40%', 
        width: '100%', 
        height: '100%',
        fontFamily: 'Arial'
    },
}));

export default useStyles;
