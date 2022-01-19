import {ContactsInfo, Socials, WorkInfo} from "../components/pages/profile/TabContent";



type ProfileTabContentType = {
    id: number;
    content: any
}

export const profileTabContent: ProfileTabContentType[] = [
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