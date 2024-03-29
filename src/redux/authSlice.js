import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      isLogin: false,
      message: '',
    },
    register: {
      isFetching: false,
      error: false,
      isRegister: false,
      message: '',
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.login.isLogin = true;
      state.login.message = 'Login success';
    },
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.message = action.payload;
    },
    logout: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
      state.login.isLogin = false;
    },
    resetLogin: (state) => {
      state.login.error = false;
      state.login.message = '';
    },
    registerStart: (state) => {
      state.register.isRegister = false;
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.isRegister = true;
      state.register.message = 'Register success';
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.message = action.payload;
    },
    resetRegister: (state) => {
      state.register.isRegister = false;
      state.register.message = '';
      state.register.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  registerStart,
  registerSuccess,
  registerFailed,
  resetLogin,
  resetRegister,
} = authSlice.actions;
export default authSlice.reducer;
