

interface ErrorsType {
    [key: string]: string;
}

export const ERRORS: ErrorsType = {
    'ERROR_500': 'Some Error happened on server',
    'LOGIN_USER_404': 'User does not exist',
    'WRONG_PASSWORD': 'Wrong password',
}