import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    defaultVolume: 0.5,
    isMuted: true,
    id: '',
    index: '',
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
    setIndexVideoPlayed: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { adjustVolume, muteVolume, setIdVideoPlay, setIndexVideoPlayed } = videoSlice.actions;
export default videoSlice.reducer;
