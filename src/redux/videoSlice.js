import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    defaultVolume: 0.5,
    isMuted: true,
    videoId: '',
    userId: '',
    nicknameUser: '',
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
      state.videoId = action.payload;
    },
    setIdUserListVideo: (state, action) => {
      state.userId = action.payload;
    },
    setNickNameUser: (state, action) => {
      state.nicknameUser = action.payload;
    },
    updateInviewList: (state, action) => {
      const cloneIndexArr = [...state.index];
      cloneIndexArr.splice(action.payload.index, 1, action.payload);
      state.index = cloneIndexArr;
    },
  },
});

export const {
  adjustVolume,
  muteVolume,
  setIdVideoPlay,
  setIdUserListVideo,
  setStateIndexView,
  setNickNameUser,
  updateInviewList,
} = videoSlice.actions;
export default videoSlice.reducer;
