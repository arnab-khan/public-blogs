import { User } from "./auth";

export interface Post {
    _id: string;
    title?: string;
    content?: string;
    author?: User;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: Like[];
    comments?: string[];
    __v?: number;
}

export interface Like {
    user: string;
    likedAt: Date;
    _id: string
}

export interface LikeResponse {
    user?: User;
    likedAt?: Date;
    _id: string
}

export interface CreatePost {
    title: string;
    content: string;
}