import { createSlice } from '@reduxjs/toolkit';

export const followSlice = createSlice({
  name: 'follow',
  initialState: {
    stateFollow: false,
    isChangeFollow: false,
    synchronizedFollow: false,
    currentUserId: null,
  },
  reducers: {
    handleRequestFollow: (state) => {
      state.isChangeFollow = !state.isChangeFollow;
      state.stateFollow = true;
      state.synchronizedFollow = true;
    },
    handleRequestUnFollow: (state) => {
      state.isChangeFollow = !state.isChangeFollow;
      state.stateFollow = false;
      state.synchronizedFollow = true;
    },
    handleCurrentVideoId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});
export const { handleRequestFollow, handleRequestUnFollow, handleCurrentVideoId } = followSlice.actions;
export default followSlice.reducer;
