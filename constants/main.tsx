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

export const howToUseSteps = [
    {
        title: "Tap card to the phone",
    },
    {
        title: "Add your information",
    },
    {
        title: "Login & enter password",
    },
    {
        title: "Start share",
    }
]

export const currenciesTitle = {
    dollar: "$",
    dirham: "Дирхам",
}

export const questions = [
    {
        id: 1,
        title: "What phones are compatible?",
        content: "TEMIR works with all modern smartphones <br /> hello world",
        isVideoSide: true,
    },
    {
        id: 2,
        title: "How to setup my TEMIR card?",
        content: `
            Once you receive your card, you can tap
            to activate and create your account. No<br /> 
            application needet and setup takes less <br />
            than 2 minutes.<br />
            At the time of your order, we only need to know what to print on your card. Everything else, you get to add to your account yourself.
        `,
        isVideoSide: true,
    },


    {
        id: 3,
        title: "What material is TEMIR card?",
        content: `
            TEMIR Card  made with  stainless steel. Our cards are sturdy and yet luxury. In addition, the gold, silver, rose gold and black matte finish adds  a premium feel that is incomparable to most cards in the market today.
        `,
    },
    {
        id: 4,
        title: "Can I design my Temir card?",
        content: `
            Yes! We have an amazing graphic design team in-house that will ensure your logo and artwork translate perfectly into the card. Design your card here

            Shortly after you place your order, we will provide you with mockup designs to review and choose from. Please make sure you provide us with high quality files in Vector, Ai, PSD, EPS, PDF, JPEG or PNG for the best result possible.
            
            Design limitations:<br />
            
            We can print by laser Silver on matte black cards<br />
            You can only design the front of your card<br />
        `
    },
    {
        id: 5,
        title: "What is the return policy?",
        content: `
           You can get a full refund within 30 days of your purchase date. You don’t need to ship your card back to us, we will deactivate your TEMIR card remotely.
            You can get a full refund within 30 days of your purchase date. You don’t need to ship your card back to us, we will deactivate your TEMIR card remotely.
        `
    },
    {
        id: 6,
        title: "How long is the delivery?",
        content: `
            Orders are processed daily. <br />
            Dubai-Sharjah-Ajman          2-10 hours<br />
            Abu Dhabi-Ras Al Khaimah   1-2 days<br />
            Umm Al Quwain Fujairah      2-3 days<br />
        `
    },
    {
        id: 7,
        title: "What is TEMIR’s privacy policy?",
        content: `
            We don’t ask our users for any sensitive information nor their social media logins. You can share as much or as little information as you’d like on your TEMIR profile. TEMIR profiles are public landing pages that hosts your information and make it easily sharable to people you meet.<br /><br />
            Read our Privacy Policy and Terms of Agreement
        `
    },
    {
        id: 8,
        title: "Any additional charges?",
        content: `
            No! <br />
            Unlike other brands, we have one time payment option only.
        `
    }
]

export const buyCardCounts = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]


type footerLinkItem = {
    isRelativePath: boolean;
    link: string;
    title: string;
}

export const footerLinks:footerLinkItem[] = [
    {
        isRelativePath: false,
        link: '',
        title: "Contact",
    },
    {
        isRelativePath: false,
        link: '',
        title: "Support",
    },
    {
        isRelativePath: false,
        link: '',
        title: "Warranty",
    },
    {
        isRelativePath: false,
        link: '',
        title: "Privacy Policy",
    },
    {
        isRelativePath: false,
        link: '',
        title: "Terms of Service ",
    },
    {
        isRelativePath: true,
        link: '/questions',
        title: "Questions",
    }
]


type socialType = {
    icon: any;
    link: string;
    color: string;
}

export const socials:socialType[] = [
    {
        icon: WhatsappRounded,
        link: "",
        color: "#0FFE68",
    },
    {
        icon: Instagram,
        link: "",
        color: "#ED1D5B",
    },
    {
        icon: FacebookOutlined,
        link: "",
        color: "#1E5FAB",
    },
    {
        icon: LinkedIn,
        link: "",
        color: "#1E5FAB",
    }
]