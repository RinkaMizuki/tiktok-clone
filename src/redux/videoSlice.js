import { createSlice } from "@reduxjs/toolkit";
import video from "~/assets/videos";

export const videoSlice = createSlice({
    name:'video',
    initialState:{
        defaultVolume: 0.5,
        isMuted: true,
    },
    reducers: {
        adjustVolume: (state,action) => {
            state.defaultVolume = action.payload;
        },
        muteVolume: (state,action) => {
            state.isMuted = action.payload;
        },
    }
})

export const {
    adjustVolume,
    muteVolume,
} = videoSlice.actions;
export default videoSlice.reducer;