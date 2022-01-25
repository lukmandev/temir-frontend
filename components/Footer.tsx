import { Container, Typography, Link as MuiLink, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { FC, useMemo } from "react";
import { footerLinks, socials } from "../constants/main";
import { media } from "../utility/media";
import NextLink from 'next/link';


const containerPY = media(30, 45);


const useStyles = makeStyles((theme:Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto',
        alignItems: 'center',
        margin: `${media(14, 25)} 0`,
        gridColumnGap: media(20, 28),
        '@media (max-width: 650px)': {
            gridTemplateColumns: 'auto auto auto auto auto',
            gridRowGap: media(20, 28),
        },
        '@media (max-width: 540px)': {
            gridTemplateColumns: 'auto auto auto auto',
        },
        '@media (max-width: 470px)': {
            gridTemplateColumns: 'auto',
            gridColumnGap: 'unset',
        },
    },
    listItem: {
        fontSize: media(14, 17),
        fontWeight: '400',
        color: theme.palette.secondary.main,
    },
    socialsList: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    socialIconLink: {
        width: media(28, 32),
        height: media(28, 32),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 10px',
    },
    socialIcon: {
        fontSize: media(17, 20),
        color: theme.palette.secondary.main,
    }
}));


const Footer:FC = () => {
    const styles = useStyles();


    const outFooterLinks = useMemo(() => {
        return footerLinks.map((el, i) => {
            const propsToLink:any = {
                underline: 'none'
            }
            if(!el.isRelativePath){
                propsToLink['href'] = el.link;
            }
            const link = (
                <MuiLink key={i} {...propsToLink} className={styles.listItem}>
                    {el.title}
                </MuiLink>
            )
            return el.isRelativePath ? (
                <NextLink key={i} href={el.link}>
                    {link}
                </NextLink>
            ) : link;
        })
    }, []);
    return (
        <Container maxWidth={false} disableGutters sx={{bgcolor: 'primary.main'}}>
             <Container component="footer" maxWidth="lg" className={styles.container}>
                <Typography fontSize={media(20, 24)} fontWeight="600" color="secondary">
                    HELP AND SUPPORT
                </Typography>
                <Box className={styles.list}>
                    {outFooterLinks}
                </Box>
                <Box className={styles.socialsList}>
                    {socials.map((elem, i) => (
                        <MuiLink sx={{background: elem.color}} key={i} href={elem.link} className={styles.socialIconLink}>
                            <elem.icon className={styles.socialIcon} />
                        </MuiLink>
                    ))}
                </Box>
            </Container>
        </Container>
    )
}

export default Footer;