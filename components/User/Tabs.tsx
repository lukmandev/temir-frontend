import {FC, ReactNode, SyntheticEvent} from "react";
import {Tab, Tabs, Theme} from "@mui/material";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import {media} from "../../utility/media";
import {selectIsDarkMode} from "../../store/selector/main";
import {useAppSelector} from "../../hooks/redux";
import {userTabList} from "../../constants/main";


const useStyles = makeStyles((theme:Theme) => ({
    tabs: {
        '& .MuiTabs-indicator': {
            display: 'none'
        }
    },
    tab: {
        flex: 1,
        background: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        padding: `${media(10, 15)} 0`,
        boxShadow: "0px 3px 8px 0px #00000040",
        '&.dark': {
            background: theme.palette.primary.main,
            border: `1px solid ${theme.palette.secondary.main}`,
        },
        '&.Mui-selected': {
            background: theme.palette.septenary.main,
            '&.dark': {
                background: theme.palette.octonary.main,
            }
        },
    },
    tabIcon: {
        color: theme.palette.primary.main,
        fontSize: media(18, 22),
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}))

interface Props{
    value: number;
    onChange: (event: SyntheticEvent<Element, Event>, value:any) => void,
}

export const UserTabs:FC<Props> = ({value, onChange}: Props) => {
    const styles = useStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    return (
        <Tabs className={styles.tabs} value={value} onChange={onChange} sx={{width: '100%', display: 'flex', flex: '1 1 1'}}>
            {userTabList.map((elem:any) => (
                <Tab key={elem.id} value={elem.id} className={clsx(styles.tab, {dark: isDarkMode})} icon={<elem.icon className={clsx(styles.tabIcon, {dark: isDarkMode})} />} />
            ))}
        </Tabs>
    )
}

interface TabContentProps{
    id: number;
    children: ReactNode;
    selectedTab: number;
}


export const TabContent:FC<TabContentProps> = ({children, id, selectedTab}:TabContentProps) => {
    if(selectedTab !== id){
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}