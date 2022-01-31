import {FC, useEffect} from "react";
import {Box} from "@mui/material";
import {gsap} from "gsap";
import {makeStyles} from '@mui/styles';
import {media} from "../utility/media";



const percent = '400%';

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
        transform: `translate(0, ${percent})`,
        opacity: 0,
    },
    logo: {
        width: media(210, 300),
        objectFit: 'contain'
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
            gsap.to('#preload-box', { y: `-${percent}`, opacity: 1, duration: 1.5 });
        }
    }, [props.isRemove]);
    return (
        <Box className={styles.wrapper} id="preload-wrapper">
            <Box id="preload-box" className={styles.box}>
                <img className={styles.logo} src={require('../assets/images/title-logo.svg')} />
            </Box>
        </Box>
    )
}


export default Preload;

