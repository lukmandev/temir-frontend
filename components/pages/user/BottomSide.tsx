import {FC, SyntheticEvent, ReactNode} from "react";
import UserTabs from "../../Tabs";
import {selectSelectedTab} from "../../../store/selector/user";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setSelectedTab} from "../../../store/reducers/user";
import {Box, Button, Theme} from "@mui/material";
import ChangeMode from "./ChangeMode";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {userTabContent} from "../../../constants/main";
import {selectIsDarkMode} from "../../../store/selector/main";
import clsx from "clsx";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {setLoginModalActive, setUniqueIdForLogin} from "../../../store/reducers/auth";



const useStyles = makeStyles((theme:Theme) => ({
    content: {
        minHeight: 430,
        padding: `${media(15, 20)} ${media(13, 18)}`,
    },
    bottomButtonsBox: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    bottomButton: {
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        borderRadius: 0,
        fontWeight: '600',
        padding: `${media(10, 15)} 0`,
        '&.dark': {
            color: theme.palette.secondary.main,
            border: `1px solid ${theme.palette.secondary.main}`
        }
    }
}));


interface TabContentProps{
    id: number;
    children: ReactNode;
}


const TabContent:FC<TabContentProps> = ({children, id}:TabContentProps) => {
    const selectedTab = useAppSelector(selectSelectedTab);
    if(selectedTab !== id){
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}


const BottomSide:FC = () => {
    const styles = useStyles();
    const selectedTab = useAppSelector(selectSelectedTab);
    const {data} = useUserContext();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const dispatch = useAppDispatch();

    const handleTabChange = (event: SyntheticEvent<Element, Event>, value:any) => {
        dispatch(setSelectedTab(value));
    }

    const saveContact = () => {
        window.location.href = `${process.env.API_URL}/api/v1/users/save-contact/${data.uniqueId}`;
    }

    const handleOpenLoginModal = () => {
        dispatch(setUniqueIdForLogin(data.uniqueId));
        dispatch(setLoginModalActive(true));
    }
    return (
        <>
            <UserTabs value={selectedTab} onChange={handleTabChange} />
            <Box className={styles.content}>
                {userTabContent.map((elem) => (
                    <TabContent key={elem.id} id={elem.id}>
                        <elem.content />
                    </TabContent>
                ))}
                <ChangeMode />
            </Box>
            <Box className={styles.bottomButtonsBox}>
                <Button onClick={handleOpenLoginModal} className={clsx(styles.bottomButton, {dark: isDarkMode})}>
                    Login
                </Button>
                <Button onClick={saveContact} className={clsx(styles.bottomButton, {dark: isDarkMode})}>
                    Save contact
                </Button>
            </Box>
        </>
    )
}

export default BottomSide;