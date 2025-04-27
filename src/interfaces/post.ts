import { User } from "./auth";

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

