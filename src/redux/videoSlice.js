import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    defaultVolume: 0.5,
    isMuted: true,
    id: '',
    index: [],
  },
  reducers: {
    adjustVolume: (state, action) => {
      state.defaultVolume = action.payload;
    },
    muteVolume: (state, action) => {
      state.isMuted = action.payload;
    },
    setIdVideoPlay: (state, action) => {
      state.id = action.payload;
    },
    updateInviewList: (state, action) => {
      const cloneIndexArr = [...state.index];
      cloneIndexArr.splice(action.payload.index, 1, action.payload);
      state.index = cloneIndexArr;
    },
  },
});

export const { adjustVolume, muteVolume, setIdVideoPlay, setStateIndexView, updateInviewList } =
  videoSlice.actions;
export default videoSlice.reducer;
