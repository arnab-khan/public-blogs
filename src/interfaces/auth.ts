export interface CheckUsername {
    available: boolean;
    message: string;
}

export interface CreateUser {
    userName: string;
    password: string;
    name: string;
    profilePicture?: string;
}

export interface LoginUser {
    userName: string;
    password: string;
}

export interface UserResponse {
    token: string;
    user: User;
}

export interface User {
    admin?: boolean;
    _id: string;
    userName?: string;
    name?: string;
    profilePicture?: string;
}
