import {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAuth} from "../../../store/selector/auth";
import {Box, Container, Modal, Typography} from "@mui/material";
import {setImageResizeModalActive} from "../../../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import ReactCrop from 'react-image-crop';
import {media} from "../../../utility/media";



const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crop: {
        '& .ReactCrop__crop-selection': {
            borderImageSource: 'none',
        }
    }
});

const ImageResizeModal:FC = () => {
    const styles = useStyles();
    const [crop, setCrop] = useState<any>({ aspect: 1 });
    const [image, setImage] = useState(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState<any>("");
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(authState.imageResizeModalActive){
            const reader = new FileReader();
            reader.readAsDataURL(authState.imageResizeModalData);
            reader.onerror = () => {
                setError("Something went wrong");
                setLoaded(true);
            }
            reader.onload = (e) => {
                setImage(e.target.result);
                setLoaded(true);
            }
        }else{
            setLoaded(false);
            setImage(null);
            setError(null);
        }
    }, [authState.imageResizeModalActive]);


    const handleClose = () => {
        dispatch(setImageResizeModalActive(false));
    }

    const getCroppedImg = (image:HTMLImageElement, crop:any, fileName:string) => {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    // @ts-ignore
                    blob.name = fileName;
                    resolve(blob);
                },
                "image/jpeg",
                1
            );
        });
    }

    const onComplete = async () => {
        if (imageRef && crop.width && crop.height) {
            const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
            const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
            console.log(
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
            )
            return "";
            const croppedImageUrl = await getCroppedImg(imageRef.current, crop, 'cropImage.jpeg');
            const fileReader = new FileReader();
            fileReader.readAsDataURL(croppedImageUrl as Blob);
            fileReader.onload = (e) => {
                setResult(e.target.result);
            }
        }else{
            setResult("");
        }
    }

    const onImageLoaded = (imgTag:HTMLImageElement) => {
        imageRef.current = imgTag;
    }

    const outImage = () => {
        if(loaded){
            if(error){
                return (
                    <Typography fontSize={media(17, 20)} fontWeight="500" color="secondary">
                        {error}
                    </Typography>
                )
            }
            return (
                <ReactCrop
                    className={styles.crop}
                    src={image}
                    crop={crop}
                    ruleOfThirds
                    onComplete={onComplete}
                    onChange={(newCrop:any) => setCrop(newCrop)}
                    onImageLoaded={onImageLoaded}
                    disabled={!(loaded && !error)}
                    imageStyle={{width: 500, height: 500}}
                />
            )
        }
        return "Loading";
    }

    return (
        <Modal open={authState.imageResizeModalActive} onClose={handleClose}>
            <Box className={styles.wrapper}>
                <Container maxWidth="sm" disableGutters>
                    {outImage()}
                    <img src={result} />
                </Container>
            </Box>
        </Modal>
    )
}


export default ImageResizeModal;