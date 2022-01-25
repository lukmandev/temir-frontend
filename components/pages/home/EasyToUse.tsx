import {FC} from "react";
import {Box, Container, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme:Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    title: {
        '& span': {
            background: "linear-gradient(180deg, #134F95 0%, #758495 100%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        }
    },
    stepsBox: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: media(55, 70),
        gridRowGap: media(20, 30),
        margin: `${media(40, 55)} 0`,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gridColumnGap: 'unset',
        }
    },
    stepItem: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'auto 1fr',
        gridColumnGap: media(15, 20),
    },
    stepCircle: {
        width: media(40, 50),
        height: media(40, 50),
        borderRadius: '50%',
        background: "linear-gradient(180deg, rgba(0, 117, 255, 0.5) 0%, rgba(203, 227, 255, 0.5) 100%)",
        boxShadow: "0px -4px 5px rgba(172, 179, 255, 0.1), 0px 4px 5px rgba(172, 179, 255, 0.1)",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepInnerCircle: {
        width: '60%',
        height: '60%',
        borderRadius: '50%',
        background: theme.palette.secondary.main,
    },
    stepContent: {
        width: '100%',
        padding: `${media(18, 22)} ${media(12, 16)}`,
        background: "linear-gradient(180deg, rgba(0, 117, 255, 0.5) 0%, rgba(203, 227, 255, 0.5) 100%)",
        boxShadow: "0px 4px 6px rgba(166, 173, 255, 0.1)",
        borderRadius: 10,
    }
}));

const EasyToUse:FC = () => {
    const styles = useStyles();
    return (
        <Container maxWidth={false} className={styles.container}>
            <Typography className={styles.title} component="h1" fontSize={media(25, 36)} fontWeight="700" color="secondary">
                EASY T<span>O</span> USE
            </Typography>
            <Container maxWidth="lg" disableGutters>
                <Box className={styles.stepsBox}>
                    {howToUseSteps.map((elem, i) => (
                        <Box className={styles.stepItem} key={i}>
                            <Box className={styles.stepCircle}>
                                <Box className={styles.stepInnerCircle} />
                            </Box>
                            <Box className={styles.stepContent}>
                                <Typography fontSize={media(16, 18)} fontWeight="500" color="secondary">
                                    {elem.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
            <Container maxWidth="xl" disableGutters>
                <iframe
                    width="100%"
                    style={{height: media(280, 615)}}
                    src="https://www.youtube.com/embed/lxRwEPvL-mQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Container>
        </Container>
    )
}


export default EasyToUse;