

interface ErrorsType {
    [key: string]: string;
}

export const ERRORS: ErrorsType = {
    'ERROR_500': 'Some Error happened on server',
}

export const USER_ERRORS: ErrorsType = {
    'USER_NOT_FOUND': 'Пользователь не найден'
}