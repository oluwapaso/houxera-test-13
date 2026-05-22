import { UserInfo, UserStateProps } from "@/components/types"; 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial_state: UserStateProps = {
    user_info: {} as UserInfo,
    access_token_expires_in: 0, 
    isLogged: false,
    isLogginIn: false,
    showPageLoader: false,
    data_counts: {},  
    favorites: [],
    tours: [],
    logged_in_as: "Self",
    logged_in_by: "",
    auth_modal: {
        shown: false,
    },
    prop_modal: {
        shown: false,
    },
    photo_modal: {
        shown: false,
    },
} 

export const UserSlice = createSlice({
    name:"user_slice",
    initialState: initial_state,
    reducers:{ 
        emptyError: (state) => {
            state.error = ""
        },
        logout: () => {
            return { ...initial_state, isLogged: false, isLogginIn: false, error: "", showPageLoader: false}
        },  
        updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.user_info = {
                ...state.user_info,
                ...action.payload
            };
        }, 
        updateFavorites: (state, action: PayloadAction<any[]>) => {
            state.favorites = [...action.payload];
        },
        updateTours: (state, action: PayloadAction<any[]>) => {
            state.tours = [...action.payload];
        },
        updateDataCounts: (state, action: PayloadAction<any>) => {
            state.data_counts = {
                ...state.data_counts,
                ...action.payload
            };
        },   
        toggleAuthModal: (state, action: PayloadAction<any>) => {
            state.auth_modal = action.payload;
        },
        togglePropertyModal: (state, action: PayloadAction<any>) => {
            state.prop_modal = action.payload;
        },
        togglePhotoModal: (state, action: PayloadAction<any>) => {
            state.photo_modal = action.payload;
        },
        updateUserWholeState: (state, action: PayloadAction<any>) => { 
            return { ...state, ...action.payload };
        },
        logOutState: () => { 
            return initial_state;
        },
    }
})
 
export const {emptyError, logout, updateUserInfo, updateDataCounts, updateFavorites, updateTours, updateUserWholeState, toggleAuthModal, 
    togglePropertyModal, togglePhotoModal, logOutState } = UserSlice.actions
export default UserSlice.reducer