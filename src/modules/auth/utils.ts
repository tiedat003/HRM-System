import { ILoginParams, ILoginValidation, IRegisterParams, IRegisterValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
    if (!email) {
        return 'Vui long nhap email'
    }
    if (!validEmailRegex.test(email)) {
        return 'Vui long nhap dung dinh dang'
    }
    return ''
}
const validatePassword = (password: string) => {
    if (!password) {
        return 'Vui long nhap mat khau'
    }
    if (password.length < 8) {
        return 'Vui long nhap du 8 ki tu'
    }
    return ''
}

const validateRepeatPassword = (password: string, repeatPassword: string) => {
    if (!repeatPassword) {
        return 'Vui long nhap lai mat khau';;
    }
    if (repeatPassword !== password) {
        return 'Nhap lai mat khau khong dung';;
    }
    return ''
}

export const validateLogin = (values: ILoginParams): ILoginValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    }
}

export const validLogin = (values: ILoginValidation) => {
    return !values.email && !values.password;
}

export const validateRegister = (values: IRegisterParams): IRegisterValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),

    };
};

export const validRegister = (values: IRegisterValidation) => {
    return !values.email && !values.password && !values.repeatPassword;
};