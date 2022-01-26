import {FC, SyntheticEvent} from "react";
import {TabContent, UserTabs} from "../../User/Tabs";
import {selectSelectedTab} from "../../../store/selector/user";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setSelectedTab} from "../../../store/reducers/user";
import {Box, Button, Container, Theme} from "@mui/material";
import ChangeMode from "./ChangeMode";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {userTabContent} from "../../../constants/main";
import {selectIsDarkMode} from "../../../store/selector/main";
import clsx from "clsx";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {setLoginModalActive, setUniqueIdForLogin} from "../../../store/reducers/auth";
import {styles} from "../../User/styles";



const useStyles = makeStyles((theme:Theme) => ({
    content: {
        ...styles.content,
    },
    bottomButtonsBox: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        position: 'sticky',
        left: 0,
        bottom: 0,
        zIndex: 3,
    },
    bottomButton: {
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        background: theme.palette.secondary.main,
        borderRadius: 0,
        fontWeight: '600',
        padding: `${media(10, 15)} 0`,
        '&.dark': {
            color: theme.palette.secondary.main,
            background: theme.palette.primary.main,
            border: `1px solid ${theme.palette.secondary.main}`
        }
    }
}));



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
                    <TabContent selectedTab={selectedTab} key={elem.id} id={elem.id}>
                        <elem.content />
                    </TabContent>
                ))}
                <ChangeMode />
            </Box>
            <Container disableGutters maxWidth="sm" className={styles.bottomButtonsBox}>
                <Button onClick={handleOpenLoginModal} className={clsx(styles.bottomButton, {dark: isDarkMode})}>
                    Login
                </Button>
                <Button onClick={saveContact} className={clsx(styles.bottomButton, {dark: isDarkMode})}>
                    Save contact
                </Button>
            </Container>
        </>
    )
}

export default BottomSide;