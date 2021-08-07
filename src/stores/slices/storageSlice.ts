import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface StorageState {
    user: {
        name: string;
        email: string;
        id: number;
        isLogin: boolean;
    };
}

// Define the initial state using that type
const initialState: StorageState = {
    user: {
        name: '',
        email: '',
        id: 0,
        isLogin: false,
    },
};

export const userSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user.email = action.payload.email;
            state.user.name = action.payload.name;
            state.user.id = action.payload.id;
            state.user.isLogin = true;
        },
        removeUser: (state) => {
            state.user = {
                name: '',
                id: 0,
                isLogin: false,
                email: '',
            };
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

// export const selectCount = (state: RootState) => state.storage;

export default userSlice.reducer;
