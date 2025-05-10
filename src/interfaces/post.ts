import { User } from "./auth";

interface BasePost {
    _id: string;
    title?: string;
    totalComments?: number;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: string[];
    comments?: string[];
    __v?: number;
}

export interface Post extends BasePost {
    author?: User;
}

interface BaseLike {
    _id: string;
    likedAt?: Date;
}

export interface Like extends BaseLike {
    user: string;
}

export interface LikeResponse extends BaseLike {
    user?: User;
}

export interface CreatePost {
    title: string;
    content: string;
}

export interface Comment {
    _id: string;
    content: string;
    commentedAt: Date;
    user: User;
}