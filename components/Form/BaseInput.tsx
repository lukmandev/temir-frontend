import {FC} from "react";
import {Box, FormControl, Input, InputLabel, TextField, Theme, Typography} from "@mui/material";
import {useField} from "formik";
import {makeStyles} from "@mui/styles";
import {media} from "../../utility/media";
import clsx from "clsx";


interface Props {
    name: string;
    id: string;
    [key:string]:any;
}

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        color: theme.palette.secondary.main
    },
    input: {
        width: '100%',
        fontSize: media(16, 18),
        color: theme.palette.primary.main,
        padding: `${media(10, 12)} ${media(13, 15)}`,
        borderRadius: 5,
        border: 'none',
        outline: 'none',
        '&:focus': {
            border: 'none',
            outline: 'none'
        }
    },
    errorText: {
        color: 'red',
    }
}));

const BaseInput:FC<Props> = ({classes, ...props}:Props) => {
    const styles = useStyles();
    const [field, meta] = useField(props.name);

    return (
        <Box sx={{width: '100%'}}>
            {!!props.label && <label htmlFor={props.id} className={styles.label}>{props.label}</label>}
            <input className={clsx(styles.input, classes)} {...field} {...props} />
            {!!(meta.touched && meta.error) && (
                <Typography fontSize={media(16, 18)} fontWeight="400" className={styles.errorText}>
                    {meta.error}
                </Typography>
            )}
        </Box>
    )
}


export default BaseInput;