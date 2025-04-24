export interface CheckUsername {
    available: boolean;
    message: string;
}

export interface CreateUser {
    userName: string;
    password: string;
    name: string;
}

export interface LoginUser {
    userName: string;
    password: string;
}

export interface User {
    message: string;
    token: string;
    _id: string;
    userName: string;
    name: string;
}
