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

const ModeSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        boxShadow: "0px 10px 10px 0px #00000040",
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.secondary.main)}" d="M20 15.31 23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.secondary.main)}" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        background: theme.palette.secondary.main,
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));


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
            <ModeSwitch
                checked={isDarkMode}
                onChange={handleModeChange}
            />
            <IconButton onClick={handleOpenShareModal}>
                <ReplyAllIcon className={clsx(styles.shareIcon, {dark: isDarkMode})}  />
            </IconButton>
        </Box>
    )
}

export default ChangeMode;