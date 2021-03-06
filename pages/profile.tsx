import AuthLayout from "../layouts/Auth";
import {Box, Container, Theme} from "@mui/material";
import ModalWithForm from "../components/pages/profile/ModalWithForm";
import {NextPage} from "next";
import {SyntheticEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setImageUploadModalActive,
    setImageUploadModalData,
    setModalWithFormActive,
    setModalWithFormData,
    setSelectedTab
} from "../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import Avatar from "../components/User/Avatar";
import {defaultAvatar, defaultBgImage} from "../constants/main";
import {selectAuth} from "../store/selector/auth";
import DarkButton from "../components/pages/profile/DarkButton";
import {UserTabs, TabContent} from "../components/User/Tabs";
import {profileTabContent} from "../constants/profile";
import {styles} from "../components/User/styles";
import Head from "next/head";
import {useProfileInfoActions} from "../hooks/profile";
import UploadPhotoModal from "../components/pages/profile/UploadPhotoModal";
import ImageResizeModal from "../components/pages/profile/ImageResizeModal";


const useStyles = makeStyles((theme:Theme) => ({
    containerFluid: {
        background: theme.palette.primary.main,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topSideBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bgBox: {
        width: '100%',
        padding: `${media(70, 100)} 0 ${media(18, 24)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    avatarHolder: {
        margin: `${media(10, 15)} 0`,
    },
    editUserInfoBox: {
        padding: `${media(10, 12)} 0`
    },
    content: {
        ...styles.content,
    },
}));


const Profile:NextPage = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);
    const {INFO} = useProfileInfoActions();

    useEffect(() => {

        return () => {
            dispatch(setModalWithFormActive(false));
            dispatch(setModalWithFormData(null));
        }
    }, []);

    useEffect(() => {
        if(authState.authInfoLoaded){
            if(authState.isAuth && !authState.profile.email){
                dispatch(setModalWithFormData('PERSONAL_EMAIL'));
                dispatch(setModalWithFormActive(true));
            }
        }
    }, [authState.authInfoLoaded]);

    const outBg = () => {
        return authState.profile.bg ? authState.profile.bg : defaultBgImage;
    }

    const outAvatar = () => {
        return authState.profile.avatar ? authState.profile.avatar : defaultAvatar;
    }

    const handleTabChange = (e:SyntheticEvent<Element, Event>, newValue:any) => {
        dispatch(setSelectedTab(newValue));
    }

    const handleOpenBgUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'BG', data: null}));
        dispatch(setImageUploadModalActive(true));
    }

    const handleOpenAvatarUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'AVATAR_WITHOUT_LTRB', data: {avatar: null}}));
        dispatch(setImageUploadModalActive(true));
    }

    return (
        <Container maxWidth={false} disableGutters className={styles.containerFluid}>
            <Head>
                <title>Edit Profile</title>
                <meta name="title" content="Edit Profile" />
            </Head>
            <ModalWithForm />
            <UploadPhotoModal />
            <ImageResizeModal />
            <Container maxWidth="sm" disableGutters>
                <Box className={styles.topSideBox}>
                    <Box className={styles.bgBox} style={{backgroundImage: `url(${outBg()})`}}>
                        <DarkButton onClick={handleOpenBgUploadModal}>Edit background</DarkButton>
                        <Box className={styles.avatarHolder}>
                            <Avatar img={outAvatar()} />
                        </Box>
                        <DarkButton onClick={handleOpenAvatarUploadModal}>Edit avatar</DarkButton>
                    </Box>
                    <Box className={styles.editUserInfoBox}>
                        <DarkButton onClick={INFO.handleOpenModal}>Edit name and position</DarkButton>
                    </Box>
                </Box>
                <UserTabs value={authState.selectedTab} onChange={handleTabChange} />
                <Box className={styles.content}>
                    {profileTabContent.map((elem, i) => (
                        <TabContent key={elem.id} id={elem.id} selectedTab={authState.selectedTab}>
                            <elem.content />
                        </TabContent>
                    ))}
                </Box>
            </Container>
        </Container>
    )
}




const AuthRequired = () => {

    return (
        <AuthLayout Children={Profile} />
    )
}

export default AuthRequired;