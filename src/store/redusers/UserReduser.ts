import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { getDataFromJwtToken } from '../../helpers/common-methods';
import { storageService } from '../../services/storangeService';

const user: User | undefined = getDataFromJwtToken(storageService.getAccessToken());
const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        user,
    } as { user: User | undefined },
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = getDataFromJwtToken(action.payload);
        },
        clearUserData: (state) => {
            state.user = undefined;
        }
    },

})
export const { setUser, clearUserData } = userSlice.actions
export default userSlice.reducer

export const isAdmin = (user: User | undefined): boolean => {
    if (user) {
        if (Array.isArray(user)) {
           return user.includes("Admin")
        }
        else {
           return user.roles === "Admin"
        }
    }
    return false;
};
