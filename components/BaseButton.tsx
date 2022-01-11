import {FC} from "react";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    button: {

    }
});

const BaseButton:FC = ({children, ...props}) => {

    return (
        <Button {...props}>
            {children}
        </Button>
    )
}

export default BaseButton;