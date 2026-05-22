import { createSlice } from "@reduxjs/toolkit";

const appState = {
    showPageLoader: false,
} 

export const appSlice = createSlice({
    name:"app_slice",
    initialState: appState,
    reducers:{ 
        showPageLoader: (state: any) => {
            state.showPageLoader = true
        },
        hidePageLoader: (state: any) => {
            state.showPageLoader = false
        }
    }, 
})

export const {showPageLoader, hidePageLoader } = appSlice.actions;
export default appSlice.reducer