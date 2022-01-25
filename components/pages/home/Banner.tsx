import {FC} from "react";
import {Box, Container, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";




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
    cardImg: {
        maxWidth: media(300, 370),
        width: '100%',
    },
    phoneBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    phoneImg: {
        maxWidth: media(300, 370),
        width: '100%',
    }
});

const Banner:FC = () => {
    const styles = useStyles();
    return (
        <Container maxWidth="lg" className={styles.container}>
            <img className={styles.cardImg} src={require('../../../assets/images/card.svg')} />
            <Box className={styles.phoneBox}>
                <img className={styles.phoneImg} src={require('../../../assets/images/phone.svg')} />
                <Typography textAlign="center" marginTop={media(20, 27)} fontSize={media(24, 36)} fontWeight="600" color="secondary">
                    DIGITAL BUSINESS CARD
                </Typography>
            </Box>
        </Container>
    )
}


export default Banner;