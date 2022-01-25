import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    '@global': {
        'html, body': {
            fontFamily: "'Raleway', sans-serif",
            boxSizing: 'border-box',
        },
        'a': {
            cursor: 'pointer',
        }
    }
});


const GlobalStyles = ():null => {
    useStyles();
    return null
}

export default GlobalStyles;