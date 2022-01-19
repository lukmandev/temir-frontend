import {FC} from "react";
import {Button, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";


const useStyles = makeStyles((theme:Theme) => ({
    button: {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15)",
        borderRadius: 1,
        '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        }
    }
}));


interface Props{
    [key:string]:any
}

const DarkButton:FC<Props> = ({children, ...props}: Props) => {
    const styles = useStyles();
    return (
        <Button className={clsx(styles.button, props.className)} {...props}>
            {children}
        </Button>
    )
}


export default DarkButton;