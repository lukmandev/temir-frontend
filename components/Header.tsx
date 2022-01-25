import {FC} from "react";
import {AppBar, Toolbar, Link as MuiLink} from "@mui/material";
import NextLink from 'next/link';
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";


const useStyles = makeStyles({
    appBar: {
        background: '#1E242B',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: `${media(15, 20)} 0`,
    },
    logo: {
        width: media(200, 340),
        objectFit: 'contain'
    }
});

const Header:FC = () => {
    const styles = useStyles();
    return (
        <AppBar position="sticky" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>
                <NextLink href="/">
                    <MuiLink>
                        <img className={styles.logo} src={require('../assets/images/header-logo.svg')} />
                    </MuiLink>
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}


export default Header;