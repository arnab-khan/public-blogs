import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../interfaces/auth";

export const userFeature = createFeatureSelector<User>('user');
export const userSelector = createSelector(
    userFeature,
    (userState: User) => userState
);