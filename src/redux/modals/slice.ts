import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostModel } from '../../generated/api/models/PostModel';

interface ModalsState {
	editModalOpened: boolean;
	editPostModalOpened: boolean;
	editPostModalModel: PostModel;
}

const initialState: ModalsState = {
	editModalOpened: false,
	editPostModalOpened: false,
	editPostModalModel: {},
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		setEditModalStatus(state, action: PayloadAction<boolean>) {
			state.editModalOpened = action.payload;
		},
		setEditPostModalStatus(state, action: PayloadAction<boolean>) {
			state.editPostModalOpened = action.payload;
		},
		setEditPostModalModel(state, action: PayloadAction<PostModel>) {
			state.editPostModalModel = action.payload;
		},
	},
});

export const { setEditModalStatus, setEditPostModalStatus, setEditPostModalModel } =
	modalsSlice.actions;

export default modalsSlice.reducer;
