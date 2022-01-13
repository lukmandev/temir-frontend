import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    '@global': {
        'html, body': {
            fontFamily: "'Raleway', sans-serif",
        }
    }
});


const GlobalStyles = ():null => {
    const styles = useStyles();
    return null
}

export default GlobalStyles;