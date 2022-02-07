import {Box, Container, IconButton, Theme, Typography} from "@mui/material";
import { NextPage } from "next";
import {FC, useRef, useState} from "react";
import { makeStyles } from "@mui/styles";
import clsx from 'clsx';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import {Formik} from 'formik';
import * as yup from 'yup';
import MainLayout from "../layouts/Main";
import { media } from "../utility/media";
import { selectCardState } from "../store/selector/card";
import {currenciesTitle} from "../constants/main";
import CardSelectItem from "../components/pages/get-card/CardSelectItem";
import PreviewWithValue from "../components/pages/get-card/PreviewWithValue";
import BlueButton from "../components/BlueButton";
import PreviewWithValueInput from "../components/pages/get-card/PreviewWithValue/input";
import Loading from "../components/Form/Loading";
// @ts-ignore
import hex2rgba from "hex2rgba";
// @ts-ignore
import Slider from 'react-slick';
import {orderCard} from "../actions/card";
import {useAppDispatch, useAppSelector} from "../hooks/redux";



const containerPY = media(15, 20);

const useStyles = makeStyles( {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        paddingTop: containerPY,
        paddingBottom: containerPY,
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
    form: {
        width: '100%',
        position: 'relative',
    },
    cardSelectHolder: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridColumnGap: media(10, 14),
        padding: `${media(10, 15)} 0`,
        '@media (max-width: 450px)': {
            gridTemplateColumns: '1fr 1fr',
            gridRowGap: media(10, 14),
        }
    },
    orderInfo: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(10, 15),
    },
    paymentTypeHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${media(15, 20)} 0`,
    },
    userInfoForm: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(13, 17),
        margin: `${media(10, 14)} 0`,
    }
});


type OrderType = {
    count: number;
    id: number;
}


const MessageText:FC = ({children, ...props}) => (
    <Typography fontSize={media(18, 20)} fontWeight="600" color="primary" {...props}>
        {children}
    </Typography>
);


const validationSchema = yup.object({
    location: yup.string()
        .required("This field is required"),
    phone: yup.string()
        .required("This field is required"),
    order: yup.array()
        .test(
            'is-not-empty',
            'Select an card',
            (value) => value.length > 0,
        )
});

type InitialValuesType = {
    order: {count: number; id: number}[],
    location: string;
    phone: string;
}

const initialValues:InitialValuesType = {
    order: [],
    location: "",
    phone: ""
}

const GetCard:NextPage = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0);
    const [isOrdered, setOrdered] = useState(false);
    const cardState = useAppSelector(selectCardState);
    const slider = useRef(null);

    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };

    const handleSlideChange = (i: number) => {
        setIndex(i);
    }

    const handleNextSlider = () => {
        slider.current.slickNext();
    }
    const handlePrevSlider = () => {
        slider.current.slickPrev();
    }

    const outCards = () => {
        if(cardState.cardsLoaded){
            if(cardState.cardsError){
                return (
                    <MessageText>
                        {cardState.cardsError}
                    </MessageText>
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
                <MessageText>
                    There is No Card
                </MessageText>
            )
        }
        return (
            <MessageText>
                Loading ...
            </MessageText>
        )
    }


    const outCardSelectItem = () => {
        if(cardState.cardsLoaded){
            if(cardState.cardsError){
                return (
                    <MessageText>
                        {cardState.cardsError}
                    </MessageText>
                )
            }
            if(cardState.cards.length){
                return cardState.cards.map((elem, i) => (
                     <CardSelectItem elem={elem} key={i} />
                ));
            }
            return (
                <MessageText>
                    There is no cards
                </MessageText>
            )
        }
        return (
            <MessageText>
                Loading ...
            </MessageText>
        )
    }

    const outCurrentCardPrice = () => {
        if(cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return null;
            }
            if(cardState.cards.length){
                return (
                    <Typography fontSize={media(17, 20)} fontWeight="600" color="secondary">
                        {cardState.cards[index][`price_dollar`]} {currenciesTitle['dollar']}
                    </Typography>

                )
            }
            return null;
        }
        return null
    }

    const outCounts = (order:OrderType[]) => {
        let count = 0;
        order.map((elem) => {
            count += elem.count;
        });
        return count;
    }

    const outTotalPrice = (order:OrderType[]) => {
        let totalPrice = 0;
        if(!cardState.cardsLoaded && !cardState.cardsError){
            return totalPrice;
        }
        order.filter((el) => !!el.count).map((elem) => {
            const card = cardState.cards.find(el => el.id === elem.id);
            totalPrice += card.price_dollar;
        });
        return totalPrice;
    }

    const handleChangeOrder = (order:OrderType[]) => () => {
        const filteredOrder = order.filter(el => !!el);
        filteredOrder.length ? setOrdered(true) : null;
    }


    return (
        <MainLayout>
            <Container maxWidth="md" className={styles.container}>
                {!isOrdered && (
                    <>
                        {outCards()}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {outCurrentCardPrice()}
                        </Box>
                    </>
                )}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                        actions.setStatus("");
                        const result = await dispatch(orderCard(values)).unwrap();
                        if(result.success){
                           actions.setStatus(result.message);
                           setOrdered(false);
                        }else{
                            actions.setStatus(result.message);
                        }
                        actions.setValues(initialValues)
                        actions.setTouched({phone: false, location: false});
                        actions.setSubmitting(false);
                    }}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            {isOrdered ? (
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Loading fontSize={media(18, 20)} active={formik.isSubmitting} bg="transparent" />
                                    <Typography component="h1" fontSize={media(17, 19)} fontWeight="700" color="secondary">
                                        CASH ON DELIVARY
                                    </Typography>
                                    <Typography marginTop={media(14, 17)} maxWidth="380px" component="p" fontSize={media(13, 15)} fontWeight="400" color="secondary">
                                        TEMIR smart card works with NFC technology. Can connect with any phone and share with your card
                                        unlimited anywahere an place.
                                        one cardd enophe to share details with ulimited times.
                                    </Typography>
                                    <Box className={styles.userInfoForm}>
                                        <PreviewWithValueInput preview="Your phone" name="phone" />
                                        <PreviewWithValueInput preview="Your location" name="location" />
                                    </Box>
                                    <BlueButton type="submit" sx={{maxWidth: media(240, 360), width: '100%'}} style={{paddingTop: media(4, 7), paddingBottom: media(4, 7)}}>
                                        SUBMIT
                                    </BlueButton>
                                </Box>
                            ) : (
                                <Container maxWidth="sm">
                                    <Box className={styles.cardSelectHolder}>
                                        {outCardSelectItem()}
                                    </Box>
                                    <Box className={styles.orderInfo}>
                                        <PreviewWithValue preview="TOTAL QTY" value={`${outCounts(formik.values.order)} pcs`} />
                                        <PreviewWithValue preview="Total Price" value={`${outTotalPrice(formik.values.order)} dirham`} />
                                    </Box>
                                    <Box className={styles.paymentTypeHolder}>
                                        <Typography marginY={media(4, 6)} textAlign="center" fontSize={media(17, 24)} fontWeight="600" color="secondary">
                                            HOW YOU WANT TO PAY?
                                        </Typography>
                                        <BlueButton sx={{maxWidth: 290, width: '100%', my: media(4, 6)}} onClick={handleChangeOrder(formik.values.order)}>CASH ON DELIVERY</BlueButton>
                                        <BlueButton sx={{maxWidth: 290, width: '100%', my: media(4, 6)}} disabled={true}>BY CARD</BlueButton>
                                        {!!formik.status && (
                                            <Typography fontSize={media(14, 17)} fontWeight="500" color="secondary">
                                                {formik.status}
                                            </Typography>
                                        )}
                                    </Box>
                                </Container>
                            )}
                        </form>
                    )}
                </Formik>
            </Container>
        </MainLayout>
    )
}

export default GetCard;