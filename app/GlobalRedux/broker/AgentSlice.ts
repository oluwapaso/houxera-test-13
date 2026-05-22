import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial_state: any = {  
}  

export const AgentSlice = createSlice({
    name:"agent_info_slice",
    initialState: initial_state,
    reducers:{  
        updateAgentInfo: (state, action: PayloadAction<any>) => {  
            return { ...state, ...action.payload };
        },
    }
})
 
export const {updateAgentInfo} = AgentSlice.actions
export default AgentSlice.reducer