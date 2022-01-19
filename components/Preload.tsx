import {FC, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import {gsap} from "gsap";
import {makeStyles} from '@mui/styles';
import {media} from "../utility/media";
import {fontFamilies} from "../constants/fonts";


const useStyles = makeStyles({
    wrapper: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: '#212121',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(0, 50%)',
        opacity: 0,
    },
    logo: {
        width: media(110, 140),
    },
    title: {
        background: "linear-gradient(270.03deg, #F1F1F1 35.8%, rgba(221, 218, 218, 0.35) 75.68%)",
        fontFamily: fontFamilies.WALLPOET.fontFamily,
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    }
});
interface Props {
    isRemove: boolean;
}

const Preload:FC<Props> = (props:Props) => {
    const styles = useStyles();

    useEffect(() => {
        gsap.to('#preload-box', { y: "0%", opacity: 1, duration: 1.5 });
    }, []);

    useEffect(() => {
        if(props.isRemove){
            gsap.to('#preload-wrapper', { autoAlpha: 0, duration: 1.5, visibility: 'hidden' });
            gsap.to('#preload-box', { y: "-30%", opacity: 1, duration: 1.5 });
        }
    }, [props.isRemove]);
    return (
        <Box className={styles.wrapper} id="preload-wrapper">
            <Box id="preload-box" className={styles.box}>
                <img className={styles.logo} src={require('../assets/images/logo.svg')} />
                <Typography className={styles.title} fontSize={media(34, 38)} fontWeight="400">
                    Temir
                </Typography>
            </Box>
        </Box>
    )
}


export default Preload;

