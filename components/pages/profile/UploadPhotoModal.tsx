import {FC, FormEvent} from "react";
import {Box, Modal, Theme, Typography} from "@mui/material";
import {Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setImageUploadModalActive} from "../../../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import BaseButton from "../../Form/BaseButton";
import {media} from "../../../utility/media";
import {useProfilePhotoActions} from "../../../hooks/profile";
import {selectAuth} from "../../../store/selector/auth";



const useStyles = makeStyles((theme:Theme) => ({
    modal: {
        maxWidth: media(340, 400),
        width: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#878787',
        borderRadius: 15,
        padding: `${media(50, 65)} ${media(35, 45)} ${media(40, 55)}`,
        border: 'none',
        outline: 'none'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectFileButton: {
        fontWeight: '600',
        color: theme.palette.primary.main,
        fontSize: media(12, 14),
        textTransform: 'none',
        padding: `${media(4, 7)} ${media(17, 20)}`,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    saveButton: {
        textTransform: 'none',
        fontSize: media(12, 14),
        fontWeight: '600',
        marginTop: media(45, 70),
    }
}));

type uploadPhotoValuesType = {
    [key:string]:string;
}
const UploadPhotoModal:FC = () => {
    const styles = useStyles();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const uploadData:any = useProfilePhotoActions();


    const outInitialValues = ():uploadPhotoValuesType => {
        const result:uploadPhotoValuesType = {}
        console.log(uploadData[authState.imageUploadModalData.key](authState.imageUploadModalData.data))
        return;
        uploadData[authState.imageUploadModalData.key](authState.imageUploadModalData.data).fields.forEach((elem:any) => {
            result[elem.name] = elem.value ? elem.value : null;
        });
        return result;
    }

    const handleClose = () => {
        dispatch(setImageUploadModalActive(false));
    }

    const handleChange = (setValues:any) => {
        return (e: FormEvent<HTMLInputElement>) => {
            setValues({name: (e.target as HTMLInputElement).files[0]})
        }
    }

    if(!authState.imageUploadModalActive){
        return null;
    }

    return (
        <Modal open={authState.imageUploadModalActive} onClose={handleClose}>
            <Box className={styles.modal}>
                <Formik
                    initialValues={outInitialValues()}
                    onSubmit={(values, actions) => {

                    }}
                >
                    {(formik) => (
                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                            <Box className={styles.topBox}>
                                <BaseButton classes={styles.selectFileButton} component="label" htmlFor="avatar-image">
                                    Select a file
                                </BaseButton>
                                <Typography fontSize={media(12, 15)} fontWeight="600" color="secondary">
                                    File not selected
                                </Typography>
                                <input accept="image/png, image/gif, image/jpeg" style={{display: 'none'}} name="avatar-image" id="avatar-image" type="file" onChange={handleChange(formik.setValues)}/>
                            </Box>
                            <BaseButton type="submit" classes={styles.saveButton}>
                                Save
                            </BaseButton>
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}


export default UploadPhotoModal;