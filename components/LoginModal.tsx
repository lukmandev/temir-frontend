import {FC, useRef} from "react";
import {Box, Button, IconButton, Modal, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Formik} from 'formik';
import * as yup from 'yup';
import BaseInput from "./Form/BaseInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectAuth} from "../store/selector/auth";
import {media} from "../utility/media";
import {setLoginModalActive, setUniqueIdForLogin} from "../store/reducers/auth";
import Loading from "./Form/Loading";
import {login} from "../actions/auth";
import {useRouter} from "next/router";
// @ts-ignore
import hex2rgba from "hex2rgba";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme:Theme) => ({
    modal: {
        maxWidth: 350,
        width: '100%',
        background: '#585858',
        borderRadius: 15,

        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',

        padding: `${media(40, 50)} ${media(30, 45)} ${media(20, 25)}`
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(10, 12),

        position: 'relative',
    },
    forgotPasswordBtn: {
        width: '100%',
        padding: `${media(3, 5)} 0`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: media(16, 18),
        color: theme.palette.primary.main,
        background: theme.palette.secondary.main,
        borderRadius: 5,
        textTransform: 'none',
    },
    sendBtn: {
        fontSize: media(13, 15),
        color: theme.palette.primary.main,
        background: theme.palette.secondary.main,
        padding: `${media(3, 5)} ${media(15, 20)}`,
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeIcon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    }
}));


const validationSchema = yup.object({
    password: yup.string()
        .required('Password is required')
        .min(6, 'Must be more or equal than 6 digits')
})

const LoginModal:FC = () => {
    const styles = useStyles();
    const router = useRouter();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const modal = useRef(null);

    const handleClose = () => {
        dispatch(setUniqueIdForLogin(""));
        dispatch(setLoginModalActive(false));
    }

    const handleForgotPassword = () => {
        dispatch(setUniqueIdForLogin(""));
        dispatch(setLoginModalActive(false));
    }

    return (
        <Modal open={authState.loginModalActive} onClose={handleClose}>
            <Box ref={modal} className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon} />
                </IconButton>
                <Formik
                    initialValues={{password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                        console.log(values)
                        actions.setSubmitting(true);
                        actions.setStatus("");
                        const loginResult = await dispatch(login({uniqueId: authState.uniqueIdForLogin, password: values.password})).unwrap();
                        if(loginResult.success){
                            handleClose();
                            router.push('/profile');
                        }else{
                            actions.setStatus(loginResult.error);
                            actions.setSubmitting(false);
                        }
                    }}
                >
                    {(formik) => (
                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                            <Loading fontSize={media(12, 14)} bg={hex2rgba('#585858', 0.7)} active={formik.isSubmitting} />
                            <BaseInput id="login-password" name="password" placeholder="Enter your password" />
                            <Button className={styles.forgotPasswordBtn}>Forgot Password ?</Button>
                            <Button className={styles.sendBtn} type="submit">LOGIN</Button>
                            {!!formik.status && (
                                <Typography fontSize={media(15, 18)} fontWeight="500" color="red">
                                    {formik.status}
                                </Typography>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}


export default LoginModal;