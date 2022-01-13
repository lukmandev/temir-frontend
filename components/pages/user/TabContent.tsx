import {FC, Key, ReactChild, ReactFragment, ReactNode, ReactPortal, useMemo} from "react";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {Box, FormControl, Input, InputLabel, Link as MuiLink, Theme, Typography} from "@mui/material";
import {outContactsInfo, socialsOut} from "../../../constants/main";
import {makeStyles} from "@mui/styles";
import {useAppSelector} from "../../../hooks/redux";
import {selectIsDarkMode} from "../../../store/selector/main";
import clsx from "clsx";
import {media} from "../../../utility/media";


const useContactsStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gridRowGap: media(20, 25),
    },
    label: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    input: {
        color: theme.palette.primary.main,
        '&:before, &.Mui-focused:before': {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            left: 0,
            bottom: 0,
            content: `""`,
            position: "absolute",
            right: 0,
            transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
        },
        '&.dark': {
            color: theme.palette.quaternary.main,
            '&:before': {
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
            }
        },
    }
}));


export const ContactsInfo: FC = () => {
    const styles = useContactsStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const {data} = useUserContext();

    const userInfo = useMemo(() => {
        return outContactsInfo(data);
    }, []);
    return (
        <form className={styles.form}>
            {userInfo.map((elem, i) => (
                <MuiLink underline="none" key={i} href={elem.link}>
                    <FormControl variant="standard">
                        <InputLabel className={clsx(styles.label, {dark: isDarkMode})}
                                    htmlFor="component-simple">{elem.label}</InputLabel>
                        <Input className={clsx(styles.input, {dark: isDarkMode})} id="component-simple"
                               value={elem.value} readOnly/>
                    </FormControl>
                </MuiLink>
            ))}
        </form>
    )
}


const useWorkInfoStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: `${media(7, 10)} 0`,
    }
});


export const WorkInfo: FC = () => {
    const styles = useWorkInfoStyles();
    return (
        <Box className={styles.wrapper}>
            <Typography>
                Your Company Name
            </Typography>
        </Box>
    )
}


const useSocialsStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridColumnGap: media(5, 7),
        gridRowGap: media(8, 10),
        padding: `${media(7, 10)} 0`,
        '&.empty': {
            display: 'flex',
            justifyContent: 'center',
            gridTemplateColumns: 'unset',
            gridColumnGap: 'unset',
            gridRowGap: 'unset',
        }
    },
    link: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconBox: {
        width: media(45, 50),
        height: media(45, 50),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&.dark': {
            background: `${theme.palette.tertiary.main}!important`
        }
    },
    icon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    },
    iconLabel: {
        color: theme.palette.primary.main,
        marginTop: 4,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    noSocialsTitle: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));


export const Socials: FC = () => {
    const styles = useSocialsStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const {data} = useUserContext();
    const socials = useMemo(() => socialsOut(data), []);
    const outSocials = () => {
        if(!socials.length){
            return (
                <Typography className={clsx(styles.noSocialsTitle, {dark: isDarkMode})} fontSize={media(20, 23)} fontWeight="600">
                    NO SOCIALS
                </Typography>
            )
        }
        return socials.map((elem: { link: string; label: string; color:string; icon: any }, i: Key) => (
            <MuiLink underline="none" className={styles.link} key={i} href={elem.link}>
                <Box sx={{background: elem.color}} className={clsx(styles.iconBox, {dark: isDarkMode})}>
                    <elem.icon className={styles.icon} />
                </Box>
                <Typography className={clsx(styles.iconLabel, {dark: isDarkMode})} fontSize={media(13, 15)} fontWeight="500">
                    {elem.label}
                </Typography>
            </MuiLink>
        ))
    }

    return (
        <Box className={clsx(styles.wrapper, {empty: !socials.length})}>
            {outSocials()}
        </Box>
    )
}