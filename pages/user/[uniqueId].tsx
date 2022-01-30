import {InferGetServerSidePropsType, GetServerSidePropsContext} from 'next'
import {createContext, useContext, useEffect, useState} from "react";
import {fetchUser, fetchUserInterface} from "../../actions/user";
import Preload from "../../components/Preload";
import {Container, Theme} from "@mui/material";
import TopSide from "../../components/pages/user/TopSide";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectIsDarkMode} from "../../store/selector/main";
import {useRouter} from "next/router";
import BottomSide from "../../components/pages/user/BottomSide";
import Head from "next/head";
import {fonts} from "../../constants/fonts";


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const userInfo: fetchUserInterface = await fetchUser(ctx.query.uniqueId);
    return {
        props: {
            userInfo
        },
    }
}

const UserContext = createContext<fetchUserInterface>({
    success: false,
    data: null,
    error: null,
    notFound: false
});

export const useUserContext = () => useContext(UserContext);

const useStyles = makeStyles((theme:Theme) => ({
    containedFluid: {
        background: theme.palette.secondary.main,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&.dark': {
            background: theme.palette.primary.main,
        }
    },
}));

const User = ({userInfo}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const styles = useStyles();
    const isDarkMode = useSelector(selectIsDarkMode);
    const router = useRouter();
    const [isRemove, setIsRemove] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsRemove(true);
        }, 3000);
    }, []);

    useEffect(() => {
        if(userInfo.notFound || userInfo.error){
            router.push(userInfo.notFound ? '/404' : '/500');
        }
    }, [userInfo.notFound, userInfo.error]);

    if(userInfo.notFound || userInfo.error){
        return "";
    }


    return (
        <UserContext.Provider value={userInfo}>
            <Head>
                {fonts[userInfo.data.fontFamily].link(1)}
                <meta name="title" content={userInfo.data.fullname ? userInfo.data.fullname : userInfo.data.uniqueId} />
                {!!userInfo.data.description && (
                    <meta name="description" content={userInfo.data.description} />
                )}
                <title>{userInfo.data.fullname ? userInfo.data.fullname : userInfo.data.uniqueId}</title>
                {
                    !!userInfo.data.avatar && <meta property="og:image" content={userInfo.data.avatar} />
                }
            </Head>
            <Preload isRemove={isRemove} />
            <Container disableGutters maxWidth={false} className={clsx(styles.containedFluid, {dark: isDarkMode})}>
                <Container maxWidth="sm" disableGutters>
                    <TopSide />
                    <BottomSide />
                </Container>
            </Container>
        </UserContext.Provider>
    )
}

export default User