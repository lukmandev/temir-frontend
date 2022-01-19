import {FC} from "react";
import {Button, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import {media} from "../../utility/media";


const useStyles = makeStyles((theme:Theme) => ({
    button: {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        borderRadius: 5,
        padding: `${media(3, 5)} ${media(14, 18)}`,
        '&:hover': {
            background: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        }
    }
}));

type Button = {
    [key:string]: any;
}


const BaseButton:FC<Button> = ({children, classes, ...props}: Button) => {
    const styles = useStyles();

    return (
        <Button className={clsx(styles.button, props.classes)} {...props}>{children}</Button>
    )
}

export default BaseButton;