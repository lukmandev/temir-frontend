import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {media} from "../../../../utility/media";
import {makeStyles} from "@mui/styles";
import {styles} from "./styles";
import {useField} from "formik";
import clsx from "clsx";


const useStyles = makeStyles(styles);

interface Props{
    preview: string;
    [key:string]:any;
}

const PreviewWithValueInput:FC<Props> = ({preview, ...props}:Props) => {
    const [field, meta] = useField(props.name);
    const styles = useStyles();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
        }}>
            <Box className={styles.orderInfoItem}>
                <Box className={styles.orderInfoPreview}>
                    <Typography sx={{textTransform: 'uppercase'}} fontSize={media(13, 15)} fontWeight="600" color="secondary">
                        {preview}
                    </Typography>
                </Box>
                <input className={clsx(styles.orderInfoResult, styles.input)} {...field} {...props} />
            </Box>
            {!!(meta.touched && meta.error) && (
                <Typography fontSize={media(14, 16)} fontWeight="600" color="secondary">
                    {meta.error}
                </Typography>
            )}
        </Box>
    )
}

export default PreviewWithValueInput;