import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist"; 
import appReducer from "./app/appSlice" 
import ThemeSliceReducer from "./theme/themeSlice";
import BrokerSliceReducer from "./broker/BrokerSlice";
import AgentSliceReducer from "./broker/AgentSlice";
import UserSliceReducer from "./user/userSlice";

//Create browser local storage configuration
const persistConfig = {
    key:"homely_main_root",
    storage: storage
}

//Combine all reducer to add and persist to local storage
const rootReducers = combineReducers({
    app: appReducer, 
    theme: ThemeSliceReducer,
    broker: BrokerSliceReducer,
    agent: AgentSliceReducer,
    user: UserSliceReducer,
})

//Add the reducers to the browser configuration to persist it
const persistedStorage = persistReducer(persistConfig, rootReducers) 

//create a store that uses the persisted data
export const store = configureStore({
    reducer: persistedStorage,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

//Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//This starts the persistence process. It save and rehydrate state
export const persistor = persistStore(store)