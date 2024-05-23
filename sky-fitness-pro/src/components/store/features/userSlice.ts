import { DataUserType } from "@/app/signin/page";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User, getAuth, sendPasswordResetEmail } from "firebase/auth";

type InitialStateType = {
  userData: User | null,
}

const initialState: InitialStateType = {
  userData: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    
  }
});




export const {
  setUserData,
  
} = userSlice.actions;

export const userReducer = userSlice.reducer;