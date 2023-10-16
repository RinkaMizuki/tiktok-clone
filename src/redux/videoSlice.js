import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    defaultVolume: 0.5,
    isMuted: true,
    infoCurrentVideo: {
      videoId: null,
      userId: null,
      nicknameUser: '',
      indexVideo: null,
    },
    indexListInView: [],
    videoListPage: [],
    listenEvent: "Home",
  },
  reducers: {
    adjustVolume: (state, action) => {
      state.defaultVolume = action.payload;
    },
    muteVolume: (state, action) => {
      state.isMuted = action.payload;
    },
    setInfoCurrentVideo: (state, action) => {
      state.infoCurrentVideo = action.payload;
    },
    
    updateInviewList: (state, action) => {
      const cloneIndexArr = [...state.indexListInView];
      cloneIndexArr.splice(action.payload.index, 1, action.payload);
      state.indexListInView = cloneIndexArr;
    },
    setCurrentListVideo: (state, action) => {
      state.videoListPage = action.payload;
    },
    setListenEvent: (state, action) => {
      state.listenEvent = action.payload;
    },
  },
});

export const {
  adjustVolume,
  muteVolume,
  setInfoCurrentVideo,
  updateInviewList,
  setCurrentListVideo,
  setListenEvent,
} = videoSlice.actions;
export default videoSlice.reducer;
