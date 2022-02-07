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
import {NextSeo} from "next-seo";


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
        alignItems: 'flex-start',
        '&.dark': {
            background: "linear-gradient(179.8deg, #040401 3.17%, rgba(0, 1, 0, 0.68) 103.85%)",
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
            <NextSeo
                title={userInfo.data.fullname ? userInfo.data.fullname : userInfo.data.uniqueId}
                {...userInfo.data.description ? {description: userInfo.data.description} : {}}
                openGraph={{
                    images: !!userInfo.data.avatar ? [
                        {
                            url: userInfo.data.avatar
                        }
                    ] : []
                }}
            />
            <Head>
                {fonts[userInfo.data.fontFamily].link(1)}
            </Head>
            <Preload isRemove={isRemove} title={userInfo.data.title} />
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