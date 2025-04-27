import { createReducer, on } from "@ngrx/store";
import { User } from "../../interfaces/auth";
import { removeUser, saveUser } from "./ngrx.action";

const initialUserState: User | {} = {};
export const userReducer = createReducer(
    initialUserState,
    on(removeUser, () => {
        return {};
    }),
    on(saveUser, (_state, props) => {
        return props;
    })
);

