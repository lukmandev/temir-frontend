import {FC, ReactNode} from "react";
import {Box, Button, FormControl, MenuItem, Select, Theme, Typography} from "@mui/material";
import Head from 'next/head'
import {makeStyles, useTheme} from "@mui/styles";
import {Formik} from 'formik';
import {media} from "../../../utility/media";
import {useProfileInfoActions} from "../../../hooks/profile";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAuth} from "../../../store/selector/auth";
import {fonts} from "../../../constants/fonts";
import BaseInput from "../../Form/BaseInput";
import BaseButton from "../../Form/BaseButton";
import * as yup from 'yup';
import {User, UserModel} from "../../../models/user";
import Loading from "../../Form/Loading";
// @ts-ignore
import hex2rgba from "hex2rgba";
import {checkTheDifference, outValues, saveValues, socials} from "../../../utility/form";
import {updateProfile} from "../../../actions/user";
import {websiteRegex} from "../../../constants/regex";


const useContactsStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gridRowGap: media(25, 40),

        padding: `${media(15, 20)} 0`,
    },
    button: {
        width: '100%',
        fontSize: media(14, 16),
        fontWeight: 700,
        background: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        textTransform: 'none',
        '&:hover': {
            background: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        }
    }
}));

export const ContactsInfo:FC = () => {
    const styles = useContactsStyles();
    const profileActions = useProfileInfoActions();

    return (
        <Box className={styles.wrapper}>
            {Object.entries(profileActions).filter((el:any) => !!el[1].isOut).map((elem:any) => (
                <Button onClick={elem[1].handleOpenModal} key={elem[0]} className={styles.button}>{elem[1].title}</Button>
            ))}
        </Box>
    )
}


const useWorkInfoStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(15, 20),

        position: 'relative'
    },
    select: {
        '&, & svg': {
            color: theme.palette.secondary.main,
        },
    },
    menu: {
        background: '#676767!important'
    },
    menuItem: {
        fontSize: media(14, 17),
        color: theme.palette.secondary.main,
    },
    button: {
        padding: `${media(4, 7)} ${media(30, 40)}`,
    }
}));


const workInfoValidationSchema = yup.object({
    fontFamily: yup.string(),
    title: yup.string()
        .nullable()
        .max(UserModel.title.max, `Title must be equal or less than ${UserModel.title.max}`),
    subtitle: yup.string()
        .nullable()
        .max(UserModel.subtitle.max, `Subtitle must be equal or less than ${UserModel.subtitle.max}`)
})





export const WorkInfo:FC = () => {
    const styles = useWorkInfoStyles();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const theme:Theme = useTheme();

    const initialValues = {
        fontFamily: authState.profile.fontFamily,
        title: !!authState.profile.title ? authState.profile.title : "",
        subtitle: !!authState.profile.subtitle ? authState.profile.subtitle : "",
        description: !!authState.profile.description ? authState.profile.description : "",
        address: !!authState.profile.address ? authState.profile.address : "",
    }

    return (
        <Box className={styles.wrapper}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={workInfoValidationSchema}
                onSubmit={async (values, actions) => {
                    const difference = checkTheDifference(initialValues, values);
                    actions.setStatus("");
                    if(!difference.isChanged){
                        actions.setStatus("Nothing is changed");
                        actions.setSubmitting(false);
                        return;
                    }
                    const result = await dispatch(updateProfile({uniqueId: authState.profile.uniqueId, ...values})).unwrap();
                    if(!result.success){
                        actions.setStatus(result.message);
                    }
                    actions.setSubmitting(false);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <Loading fontSize={media(16, 18)} bg={hex2rgba(theme.palette.primary.main, 0.7)} active={formik.isSubmitting} />
                        <Head>
                            {Object.entries(fonts).map((elem:any, i:number) => elem[1].link(i))}
                        </Head>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    className={styles.select}
                                    value={formik.values.fontFamily}
                                    style={{fontFamily: fonts[formik.values.fontFamily].fontFamily}}
                                    onChange={formik.handleChange}
                                    name="fontFamily"
                                    label="Font Family"
                                    MenuProps={{classes: {paper: styles.menu}}}
                                >
                                    {Object.entries(fonts).map((elem) => (
                                        <MenuItem style={{fontFamily: elem[1].fontFamily}} className={styles.menuItem} key={elem[0]} value={elem[0]}>{elem[1].fontFamily}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <BaseInput style={{fontFamily: fonts[formik.values.fontFamily].fontFamily}} placeholder="Title" name="title" id="title" />
                        <BaseInput placeholder="Subtitle" name="subtitle" id="subtitle" />
                        <BaseInput placeholder="Description" name="description" id="description" />
                        <BaseInput placeholder="Address" name="address" id="address" />
                        <BaseButton classes={styles.button} type="submit">Save</BaseButton>
                        {!!formik.status && (
                            <Typography fontSize={media(14, 16)} fontWeight="500" color="secondary">
                                {formik.status}
                            </Typography>
                        )}
                    </form>
                )}
            </Formik>
        </Box>
    )
}


const socialsValidationSchema = yup.object({
    whatsapp: yup.string(),
    instagram: yup.string(),
    facebook: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    linkedin: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    youtube: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    telegram: yup.string(),
    snapchat: yup.string(),
    tiktok: yup.string(),
    twitter: yup.string(),
});


const useSocialsStyles = makeStyles((theme:Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gridRowGap: media(10, 15),
        position: 'relative',
    },
    icon: {
        color: theme.palette.secondary.main,
        fontSize: media(22, 24)
    },
    fieldItem: {
        display: 'flex',
        gridColumnGap: media(7, 10),
        alignItems: 'center',
    }
}));


export const Socials:FC = () => {
    const styles = useSocialsStyles();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);
    const theme:Theme = useTheme();

    const outInitialValues = () => {
        const pickFields = ({instagram, facebook, tiktok, whatsapp, linkedin, telegram, snapchat, twitter, youtube}:User) => ({instagram, facebook, tiktok, whatsapp, linkedin, telegram, snapchat, twitter, youtube});
        return outValues(pickFields(authState.profile));
    }

    return (
        <Formik
            initialValues={outInitialValues()}
            validationSchema={socialsValidationSchema}
            onSubmit={async (values, actions) => {
                actions.setStatus("");
                const difference = checkTheDifference(outInitialValues(), values);
                if(!difference.isChanged){
                    actions.setStatus("Nothing is changed");
                }else{
                    const turnedValues = saveValues(difference.changedValues);
                    const result = await dispatch(updateProfile({
                        uniqueId: authState.profile.uniqueId,
                        ...turnedValues
                    })).unwrap();
                    if(!result.success){
                        actions.setStatus(result.message);
                    }
                }
                actions.setSubmitting(true);
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <Loading fontSize={media(18, 20)} bg={hex2rgba(theme.palette.primary.main, 0.7)} active={formik.isSubmitting} />
                    {Object.entries(socials).map((elem, i) => {
                        const Icon = elem[1].icon;
                        return (
                            <Box key={i} className={styles.fieldItem}>
                                <Icon className={styles.icon} />
                                <BaseInput name={elem[0]} id={elem[0]} placeholder={elem[1].placeholder} />
                            </Box>
                        )
                    }
                    )}
                    <BaseButton type="submit">Save</BaseButton>
                    {!!formik.status && (
                        <Typography textAlign="center" fontSize={media(16, 18)} fontWeight="500" color="secondary">
                            {formik.status}
                        </Typography>
                    )}
                </form>
            )}
        </Formik>
    )
}

