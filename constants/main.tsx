import PhoneIcon from '@mui/icons-material/Phone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {ContactsInfo, Socials, WorkInfo} from "../components/pages/user/TabContent";
import {User} from "../models/user";
import TikTok from "../components/Icons/TikTok";
import {Instagram, FacebookOutlined, WhatsappRounded, LinkedIn, Telegram, Twitter, YouTube} from "@mui/icons-material";
import Snapchat from "../components/Icons/Snapchat";
import {
    WhatsappShareButton,
    InstapaperShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
} from 'react-share';



export const defaultBgImage = require('../assets/images/default-bg.svg');

export const defaultAvatar = require('../assets/images/default-avatar.svg');

export const userTabList = [
    {
        id: 1,
        icon: PhoneIcon,
    },
    {
        id: 2,
        icon: BusinessCenterIcon,
    },
    {
        id: 3,
        icon: ViewModuleIcon,
    },
]


export const userTabContent = [
    {
        id: 1,
        content: ContactsInfo,
    },
    {
        id: 2,
        content: WorkInfo,
    },
    {
        id: 3,
        content: Socials,
    }
]

const phoneLink = (phone:string | null) => `tel:${phone}`;

const emailLink = (email:string | null) => `mailto:${email}`;



interface contactsInfo{
    label:string;
    value:string;
    link:string;
}

export const outContactsInfo = (data: User):contactsInfo[] => {
    const {personalPhone, workPhone, workEmail, email, workWebsite, otherWebsite} = data;

    return [
        {
            label: "Personal phone",
            value: personalPhone,
            link: phoneLink(personalPhone),
        },
        {
            label: "Phone",
            value: workPhone,
            link: phoneLink(workPhone)
        },
        {
            label: "Work email",
            value: workEmail,
            link: emailLink(workEmail)
        },
        {
            label: "Email",
            value: email,
            link: emailLink(email)
        },
        {
            label: "Work Website",
            value: workWebsite,
            link: workWebsite
        },
        {
            label: "Website",
            value: otherWebsite,
            link: otherWebsite
        },
    ].filter(el => !!el.value);
}


export const socialsOut = (data:User):any => {
    const {
        instagram,
        facebook,
        tiktok,
        whatsapp,
        linkedin,
        telegram,
        snapchat,
        twitter,
        youtube
    } = data;

    return [
        {
            icon: Instagram,
            label: 'Instagram',
            color: '#FF0000',
            link: instagram,
        },
        {
            icon: FacebookOutlined,
            label: 'Facebook',
            color: '#045AFF',
            link: facebook,
        },
        {
            icon: TikTok,
            label: "Tik-Tok",
            color: '#000000',
            link: tiktok,
        },
        {
            icon: WhatsappRounded,
            label: 'Whatsapp',
            color: '#0CFF67',
            link: whatsapp,
        },
        {
            icon: LinkedIn,
            label: 'Linkedin',
            color: '#0AA7FF',
            link: linkedin,
        },
        {
            icon: Telegram,
            label: 'Telegram',
            color: 'linear-gradient(180deg, #3A5AAC 0%, #00C2FF 99.26%)',
            link: telegram,
        },
        {
            icon: Snapchat,
            label: 'Snapchat',
            color: '#FBE309',
            link: snapchat,
        },
        {
            icon: Twitter,
            label: 'Twitter',
            color: '#1E81F5',
            link: twitter,
        },
        {
            icon: YouTube,
            label: 'YouTube',
            color: '#DC1B1B',
            link: youtube
        }
    ].filter(el => !!el.link);
}


interface shareSocialType{
    shareBtn:any;
    icon:any
}

export const shareSocials:shareSocialType[] = [
    {
        shareBtn: InstapaperShareButton,
        icon: Instagram,
    },
    {
        shareBtn: FacebookShareButton,
        icon: FacebookOutlined,
    },
    {
        shareBtn: WhatsappShareButton,
        icon: WhatsappRounded,
    },
    {
        shareBtn: TelegramShareButton,
        icon: Telegram,
    },
    {
        shareBtn: TwitterShareButton,
        icon: Twitter,
    },
    {
        shareBtn: LinkedinShareButton,
        icon: LinkedIn,
    },
]
