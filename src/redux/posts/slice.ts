import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostModel } from '../../generated/api';

interface PostsState {
    posts: Array<PostModel>,
    selectedImage?: string,
    postText?: string,
    news: Array<PostModel>
}

const initialState: PostsState = {
    posts: [],
    news: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Array<PostModel>>){
        state.posts = action.payload
    },
    setSelectedImage(state, action: PayloadAction<string>){
        state.selectedImage = action.payload
    },
    setPostText(state, action: PayloadAction<string>){
        state.postText = action.payload
    },
    setNews(state, action: PayloadAction<Array<PostModel>>){
        state.news = action.payload
    },
  },
});

export const { setPosts, setSelectedImage, setPostText, setNews } =
  postsSlice.actions

export default postsSlice.reducer