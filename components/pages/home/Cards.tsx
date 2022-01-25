import {FC, useRef, useState} from "react";
import {Box, Button, Container, IconButton, Theme, Link as MuiLink, Typography} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";
import {useAppSelector} from "../../../hooks/redux";
import {selectCardState} from "../../../store/selector/card";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import NextLink from 'next/link';
// @ts-ignore
import Slider from 'react-slick';
import clsx from "clsx";
import {currenciesTitle} from "../../../constants/main";


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
    slider: {
        '& .slick-dots': {
            margin: 0,
            padding: 0,
            display: 'flex!important',
            justifyContent: 'center',
            listStyleType: "none",
            '& li': {
            }
        }
    },
    sliderItemBox: {
        outline: 'none',
        border: 'none'
    },
    sliderImg: {
        width: '100%',
        height: media(240, 345),
        objectFit: 'contain'
    },
    sliderArrows: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
    },
    sliderIcon: {
        color: "#726E6E",
        fontSize: media(20, 23)
    },
    prevArrow: {
        left: 0,
    },
    nextArrow: {
        right: 0,
    },
    sliderDotsList: {
        display: 'flex',
    },
    sliderDot: {
        width: media(10, 15),
        height: media(10, 15),
        borderRadius: '50%',
        background: theme.palette.primary.main,
        margin: 10,
    },
    button: {
        background: "linear-gradient(180deg, rgba(0, 40, 87, 0.5) 0%, rgba(0, 117, 255, 0.5) 100%)",
        borderRadius: 5,
        color: theme.palette.secondary.main,
        maxWidth: 450,
        width: '100%',
        marginTop: media(3, 5),
        fontWeight: '600',
        fontSize: media(16, 18)
    }
}));


const Cards:FC = () => {
    const styles = useStyles();
    const cardState = useAppSelector(selectCardState);
    const slider = useRef(null);
    const [index, setIndex] = useState(0);

    const handleNextSlider = () => {
        slider.current.slickNext();
    }
    const handlePrevSlider = () => {
        slider.current.slickPrev();
    }

    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots:any) => {
            return <ul className={styles.sliderDotsList}>{dots.map((elem:any, i:number) => <li className={styles.sliderDot} key={i} onClick={elem.props.children.props.onClick} />)}</ul>
        }
    };

    const handleSlideChange = (i: number) => {
        setIndex(i);
    }

    const outCurrentCardPrice = () => {
        if(cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return null;
            }
            if(cardState.cards.length){
                return (
                    <Typography fontSize={media(23, 36)} fontWeight="600" color="secondary">
                        {cardState.cards[index][`price_dollar`]} {currenciesTitle['dollar']}
                    </Typography>
                )
            }
            return null;
        }
        return null
    }

    const outCards = () => {
        if(cardState.cardsLoaded){
            if(cardState.cardsError){
                return (
                    <Typography>
                        {cardState.cardsError}
                    </Typography>
                )
            }
            if(cardState.cards.length){
                return (
                    <Box sx={{width: '100%', position: 'relative'}}>
                        <IconButton className={clsx(styles.sliderArrows, styles.prevArrow)} onClick={handlePrevSlider}>
                            <ArrowBackIos className={styles.sliderIcon} />
                        </IconButton>
                        <IconButton className={clsx(styles.sliderArrows, styles.nextArrow)} onClick={handleNextSlider}>
                            <ArrowForwardIos className={styles.sliderIcon} />
                        </IconButton>
                        <Slider
                            ref={slider}
                            {...settings}
                            afterChange={handleSlideChange}
                            className={styles.slider}
                        >
                            {cardState.cards.map((elem) => (
                                <Box key={elem.id} className={styles.sliderItemBox}>
                                    <img className={styles.sliderImg} src={elem.image} />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                )
            }
            return (
                <Typography>
                    There is no cards
                </Typography>
            )
        }
        return (
            <Typography>
                Loading ...
            </Typography>
        )
    }
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Typography fontSize={media(22, 34)} fontWeight="600" color="secondary">
                TEMIR COLLECTION
            </Typography>
            {outCurrentCardPrice()}
            {outCards()}
            <NextLink href="/get-card">
                <Button component={MuiLink} className={styles.button}>Get Your Card</Button>
            </NextLink>
        </Container>
    )
}

export default Cards;