import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isFetching: false,
    isSuccess: false,
    message: '',
    error: false,
  },
  reducers: {
    updateProfileStart: (state) => {
      state.isFetching = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    updateProfileFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});
export const { updateProfileStart, updateProfileSuccess, updateProfileFailed } = profileSlice.actions;
export default profileSlice.reducer;
