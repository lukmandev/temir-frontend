import api from "../http/api";
import {ERRORS} from "../constants/errors";
import {User} from "../models/user";


export interface fetchUserResultInterface {
    success: boolean;
    data: User | null;
    error: null | string;
    notFound: boolean;
}

export const fetchUser = async (uniqueId: string | string[] | undefined) => {
    const result: fetchUserResultInterface = {
        success: false,
        data: null,
        error: null,
        notFound: false
    }
    try {
        const {data} = await api.get(`users/${uniqueId}`);
        result.data = data;
        result.success = true;
    } catch (e: any){
        result.success = false;
        if(e.response){
            if(e.response.status === 404){
                result.notFound = true;
            }else{
                result.error = ERRORS['ERROR_500'];
            }
        }else if(e.request && !e.response){
            result.error = ERRORS['ERROR_500'];
        }else{
            result.error = ERRORS['ERROR_500'];
        }
    }
    return result;
}