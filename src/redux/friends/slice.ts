import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostModel, UserModel } from '../../generated/api';

interface FriendsState {
    friends: Array<UserModel>
}

const initialState: FriendsState = {
    friends: []
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<Array<UserModel>>){
        state.friends = action.payload
    },
  },
});

export const { setFriends } =
  friendsSlice.actions

export default friendsSlice.reducer