import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {media} from "../utility/media";


const useStyles = makeStyles({
    wrapper: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#212121',
    },
    logo: {
        width: media(110, 140),
    }
});

const Preload:FC = () => {
    const styles = useStyles();
    return (
        <Box className={styles.wrapper}>
            <img className={styles.logo} src={require('../assets/images/logo.svg')} />
            <Typography fontSize={media(30, 36)} fontWeight="400">
                
            </Typography>
        </Box>
    )
}


export default Preload;

