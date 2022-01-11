import {createTheme, ThemeOptions} from '@mui/material/styles';
import {media} from "./media";


// @ts-ignore
export const theme: ThemeOptions = createTheme({
    typography: {
        "fontFamily": `'Raleway', sans-serif`,
        "fontSize": media(14, 16),
    },
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: {
            main: '#FFFFFF',
        },
        quaternary: {
            main: '#000'
        },
        senary: {
            main: '#0D82F9'
        },
        septenary: {
            main: '#D6D6D6'
        },
        octonary: {
            main: '#414141'
        },
        nonary: {
            main: '#000'
        },
        denary: {
            main: '#000'
        }
    },
});
