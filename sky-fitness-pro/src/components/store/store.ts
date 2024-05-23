import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";


export const store = () => {
    return configureStore({
reducer: combineReducers({
    user: userReducer,
    
}),

});
}

export type AppStore = ReturnType<typeof store>;

// С помощью ReturnType мы получаем тип состояния, возвращаемого нашим хранилищем.
export type RootState = ReturnType<AppStore["getState"]>;


// Функция dispatch используется для отправки действий в хранилище, чтобы обновить состояние.
// С помощью AppStore["dispatch"] мы получаем точный тип функции dispatch для использования в нашем приложении.

export type AppDispatch = AppStore["dispatch"];