import { DataUserType } from "@/app/signin/page";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "firebase/auth";

type InitialStateType = {
  userData: User | null,
  userDataDuble: DataUserType,
}

const initialState: InitialStateType = {
  userData: null,
  userDataDuble: {
    email: "",
    password: ""
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    setUserDataDuble: (state, action: PayloadAction<DataUserType>) => {
      state.userDataDuble.email = action.payload.email;
      state.userDataDuble.password = action.payload.password;
    },

  }
});




export const {
  setUserData,
  setUserDataDuble,

} = userSlice.actions;

export const userReducer = userSlice.reducer;