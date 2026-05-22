import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initial_state: any = {  
}  

export const BrokerSlice = createSlice({
    name:"broker_info_slice",
    initialState: initial_state,
    reducers:{  
        updateBrokerInfo: (state, action: PayloadAction<any>) => {  
            return { ...state, ...action.payload };
        },
    }
})
 
export const {updateBrokerInfo} = BrokerSlice.actions
export default BrokerSlice.reducer