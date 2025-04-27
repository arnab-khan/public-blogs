import { createAction, props } from "@ngrx/store";
import { User } from "../../interfaces/auth";

// save user ngrx action
export const saveUser = createAction('[user] Save User', props<User>());
// remove user ngrx action
export const removeUser = createAction('[user] Remove User');
