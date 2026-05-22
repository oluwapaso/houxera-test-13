import { APIResponseProps, ThemeStateProps } from "@/components/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial_state: ThemeStateProps = {  
    theme_settings: { }, 
}

type paramsType = {
    theme_name: string, 
}

export const LoadThemeSettings = createAsyncThunk("theme/settings", async ({theme_name}: paramsType, { rejectWithValue }) => { 

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    return fetch(`${apiBaseUrl}/api/v1/mls/themes/settings?theme_name=${theme_name}`, {
        method: "GET",
        headers: {
            // 'Content-Type': 'application/json',
        },   
        // 'credentials': 'include', 
    }).then((resp): Promise<APIResponseProps> => {
        
        if (!resp.ok) {
            throw new Error(`"Unable to load theme info: "${resp.status} ${resp.statusText}`)
        }

        return resp.json();
    }).then(data => {
        return data
    })

})


export const ThemeSlice = createSlice({
    name:"theme_slice",
    initialState: initial_state,
    reducers:{ 
        emptyError: (state) => {
            state.error = ""
        }, 
        SetThemeLinkPrefix: (state, action: PayloadAction<any>) => {
            state.theme_settings = {
                ...state.theme_settings,
                ...action.payload
            };
        }, 
        updateThemeSettings: (state, action: PayloadAction<any>) => {  
            state.theme_settings = {
                ...state.theme_settings,
                ...action.payload
            };
        },
        updateWholeState: (state, action: PayloadAction<any>) => { 
            return { ...state, ...action.payload };
        },
    },
    extraReducers(builder){
        builder.addCase(LoadThemeSettings.pending, () => { return { ...initial_state, settLoaded: false, isSettLoading: true, error:""}})
        builder.addCase(LoadThemeSettings.rejected, () => { return { ...initial_state, settLoaded: false, isSettLoading: false, error: "Error login in."}})
        builder.addCase(LoadThemeSettings.fulfilled, (state, action: PayloadAction<any>)=> {

            if(typeof action.payload && typeof action.payload == "object"){
                
                if(action.payload.success){

                    return {
                        ...action.payload.data, 
                        settLoaded: true,
                        isSettLoading: false,
                        error: "",
                    }

                }else{
                    return { ...initial_state, settLoaded: false, isSettLoading: false, error: action.payload.message}
                }

            }else{
                return { ...initial_state, settLoaded: false, isSettLoading: false, error: "Unknow error."}
            }

        })
    }
})
 
export const {emptyError, updateWholeState, updateThemeSettings } = ThemeSlice.actions
export default ThemeSlice.reducer