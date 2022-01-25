import {FC} from "react";
import {Container, Typography} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";


const containerPY = media(30, 45);

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    img: {
        width: '100%',
        height: media(400, 1000),
        objectFit: 'cover',
        marginTop: media(20, 40),
    }
});


const About:FC = () => {
    const styles = useStyles();
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Typography color="secondary" component="h1" fontSize={media(30, 36)} fontWeight="600">
                ABOUT
            </Typography>
            <Typography color="secondary" component="p" fontSize={media(16, 17)} fontWeight="400">
                TEMIR we believe in networking is evolving at a record pace thanks to our increasing reliance on technology. Everything from how we do business, how we meet up, and even how we exchange contact information is changing to reflect a paperless, eco-friendly society.<br />
                &nbsp;&nbsp;&nbsp;&nbsp;Dubai Government aims to make Dubai, a smart city.  It is building smart sustainable cities and delivering services through apps. It is also encouraging the gathering and sharing of data to develop and customise services for customer happiness.
            </Typography>
            <img src={require('../../../assets/images/about.png')} className={styles.img} />
        </Container>
    )
}

export default About;