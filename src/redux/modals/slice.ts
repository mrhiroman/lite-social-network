import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostModel, UserModel } from '../../generated/api';

interface ModalsState {
    editModalOpened: boolean
}

const initialState: ModalsState = {
    editModalOpened: false
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setEditModalStatus(state, action: PayloadAction<boolean>){
        state.editModalOpened = action.payload
    },
  },
});

export const { setEditModalStatus } =
  modalsSlice.actions

export default modalsSlice.reducer