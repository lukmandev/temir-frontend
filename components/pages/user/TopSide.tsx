import {FC} from "react";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import Avatar from "../../User/Avatar";
import {defaultAvatar, defaultBgImage} from "../../../constants/main";
import UserTitles from "./UserTitles";


const useStyles = makeStyles({
    topSideBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bgBox: {
        width: '100%',
        padding: `${media(80, 110)} 0 ${media(18, 24)}`,
        display: 'flex',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
});

const TopSide:FC = () => {
    const styles = useStyles();
    const user = useUserContext();

    const outBg = () => {
        if(user.data!.bg){
            return user.data!.bg;
        }
        return defaultBgImage;
    }

    const outAvatar = () => {
        if(user.data!.avatar){
            return user.data!.avatar;
        }
        return defaultAvatar;
    }
    return (
        <Box className={styles.topSideBox}>
            <Box className={styles.bgBox} style={{backgroundImage: `url(${outBg()})`}}>
                <Avatar img={outAvatar()} />
            </Box>
            <UserTitles />
        </Box>
    )
}

export default TopSide;