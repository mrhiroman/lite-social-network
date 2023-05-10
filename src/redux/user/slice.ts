import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../generated/api';

interface UserState {
    currentUser?: UserModel,
    renderedUser?: UserModel,
    isSignedIn: boolean,
    avatarImage?: string 
}

const initialState: UserState = {
    isSignedIn: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserModel>){
      state.currentUser = action.payload
    },
    setRenderedUser(state, action: PayloadAction<UserModel>){
      state.renderedUser = action.payload
    },
    setSigninState(state, action: PayloadAction<boolean>){
      state.isSignedIn = action.payload
    },
    setAvatarImage(state, action: PayloadAction<string>){
      state.avatarImage = action.payload
    }
  },
});

export const { setCurrentUser, setRenderedUser, setSigninState, setAvatarImage } =
  userSlice.actions

export default userSlice.reducer