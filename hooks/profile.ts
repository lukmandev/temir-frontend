import {useAppDispatch, useAppSelector} from "./redux";
import {updateProfile} from "../actions/user";
import {selectAuth} from "../store/selector/auth";
import {setModalWithFormActive, setModalWithFormData} from "../store/reducers/auth";
import * as yup from 'yup';
import {UserModel} from "../models/user";


const websiteRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

type FormikValues = {
    [key:string]: string;
}

const infoValidationSchema = yup.object({
    fullname: yup.string(),
    position: yup.string(),
});

const phoneValidationSchema = yup.object({
    workPhone: yup.string(),
    personalPhone: yup.string(),
});

const emailValidationSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Must be correct email'),
    workEmail: yup.string()
        .email('Must be correct email'),
});

const websiteValidationSchema = yup.object({
    workWebsite: yup.string()
        .matches(websiteRegex, 'Enter correct url'),
    personalWebsite: yup.string()
        .matches(websiteRegex, 'Enter correct url')
});

const passwordValidationSchema = yup.object({
    password: yup.string()
        .required('Enter your password')
        .min(UserModel.password.min, `Password must be equal or more than ${UserModel.password.min}`)
        .max(UserModel.password.max, `Password must be equal or less than ${UserModel.password.max}`),
    password_confirmation: yup.string()
        .required('Enter your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const useProfileActions = ():any => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);

    const handleChangeData = async (values: FormikValues, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(updateProfile({
            uniqueId: authState.profile.uniqueId,
            ...values,
        })).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            actions.setStatus("Successfully changed");
        }
        actions.setSubmitting(false);
    }

    const handleChangePassword = async (values: FormikValues, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(updateProfile({
            uniqueId: authState.profile.uniqueId,
            password: values.password,
        })).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            actions.setStatus("Successfully changed");
        }
        actions.setSubmitting(false);
        actions.resetForm();
        dispatch(setModalWithFormActive(false));
    }

    const handleOpenModal = (key: string) => {
        return () => {
            dispatch(setModalWithFormData(key));
            dispatch(setModalWithFormActive(true));
        }
    }

    return {
        'INFO': {
            handleOpenModal: handleOpenModal('INFO'),
            title: "Info",
            validationSchema: infoValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "fullname",
                    label: "Your name",
                },
                {
                    field: "position",
                    label: "Your position",
                }
            ]
        },
        'PHONE': {
            handleOpenModal: handleOpenModal('PHONE'),
            title: "Edit phone",
            validationSchema: phoneValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "workPhone",
                    label: "Your work phone",
                },
                {
                    field: "personalPhone",
                    label: "Your personal phone",
                }
            ]
        },
        'EMAIL': {
            handleOpenModal: handleOpenModal('EMAIL'),
            title: "Edit email",
            validationSchema: emailValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "workEmail",
                    label: "Your work email",
                },
                {
                    field: "email",
                    label: "Your personal email",
                }
            ]
        },
        'WEBSITE': {
            handleOpenModal: handleOpenModal('WEBSITE'),
            title: "Edit website",
            validationSchema: websiteValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "workWebsite",
                    label: "Your work website",
                },
                {
                    field: "otherWebsite",
                    label: "Other website",
                }
            ]
        },
        'PASSWORD': {
            handleOpenModal: handleOpenModal('PASSWORD'),
            title: "Edit password",
            validationSchema: passwordValidationSchema,
            handleSubmit: handleChangePassword,
            fields: [
                {
                    field: "password",
                    defaultValue: "",
                    label: "Your new password",
                },
                {
                    field: "password_confirmation",
                    defaultValue: "",
                    label: "Confirm your password",
                }
            ]
        }
    }
}


export default useProfileActions;