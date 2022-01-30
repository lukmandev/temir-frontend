import {FC} from "react";
import {Box, IconButton, Switch, Theme} from "@mui/material";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { styled } from '@mui/material/styles';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectIsDarkMode} from "../../../store/selector/main";
import {setIsDarkMode, setShareModalActive, setShareModalUrl} from "../../../store/reducers/main";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import clsx from "clsx";
import {useUserContext} from "../../../pages/user/[uniqueId]";



const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: media(10, 15)
    },
    shareIcon: {
        fontSize: media(20, 22),
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));

const ChangeMode:FC = () => {
    const styles = useStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const {data} = useUserContext();
    const dispatch = useAppDispatch();

    const handleModeChange = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }

    const handleOpenShareModal = () => {
        dispatch(setShareModalUrl(`${process.env.BASE_URL}/user/${data.uniqueId}`));
        dispatch(setShareModalActive(true));
    }
    return (
        <Box className={styles.wrapper}>
            <IconButton onClick={handleOpenShareModal}>
                <ReplyAllIcon className={clsx(styles.shareIcon, {dark: isDarkMode})}  />
            </IconButton>
        </Box>
    )
}

export default ChangeMode;