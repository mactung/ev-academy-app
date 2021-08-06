import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface StorageState {
    user: {
        name: string;
        id: number;
        isLogged: boolean;
    };
}

// Define the initial state using that type
const initialState: StorageState = {
    user: {
        name: '',
        id: 0,
        isLogged: false,
    },
};

export const userSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.user.name = action.payload.name;
            state.user.id = action.payload.id;
            state.user.isLogged = true;
        },
        removeUser: (state) => {
            state.user = {
                name: '',
                id: 0,
                isLogged: false,
            };
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

// export const selectCount = (state: RootState) => state.storage;

export default userSlice.reducer;
