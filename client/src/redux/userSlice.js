import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscribe: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId => channelId === action.payload), 1
                    )
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
        signupStart: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        signupFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        saveVideo: (state, action) => {
            if (!state.currentUser.savedVideos.includes(action.payload)) {
                state.currentUser.savedVideos.push(action.payload);
            }
        },
        removeSavedVideo: (state, action) => {
            if (state.currentUser.savedVideos.includes(action.payload)) {
                state.currentUser.savedVideos.splice(state.currentUser.savedVideos.findIndex(
                    (videoId) => videoId === action.payload), 1
                );
            }
        }
    }
});


export const { loginStart, loginSuccess, loginFailure, logout, subscribe, signupStart, signupSuccess, signupFailure, saveVideo, removeSavedVideo } = userSlice.actions;
export default userSlice.reducer;
