import {makeStyles} from "@mui/styles";
import {media} from "../../utility/media";


export const useStyles = makeStyles({
    topSideBox: {
        width: '100%',
    },
    bgBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: `${media(80, 110)} 0 ${media(18, 24)}`,
    }
});