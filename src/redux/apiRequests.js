import { userLogin, userRegister } from '~/services/authService';
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from './authSlice';
import { updateProfileFailed, updateProfileStart } from './profileSlice';
import { updateCurrentProfileUser } from '~/services/userService';

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const result = await userLogin(user);
    if (result?.response?.data?.status_code === 422) {
      throw result.response.data.errors.email[0];
    } else if (result?.response?.data?.status_code === 401) {
      // eslint-disable-next-line no-throw-literal
      throw 'Wrong password';
    } else {
      let now = new Date();
      now.setTime(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + now.toUTCString();
      document.cookie = 'token=' + result.data.meta.token + ';' + expires;
      dispatch(loginSuccess(result.data.data));
      navigate('/');
    }
  } catch (err) {
    dispatch(loginFailed(err));
  }
};

export const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const result = await userRegister(user);
    if (result?.response?.data?.status_code === 422) {
      throw result.response.data.errors;
    } else {
      dispatch(registerSuccess());
    }
  } catch (err) {
    dispatch(registerFailed(err));
  }
};
export const updateProfile = async (data, dispatch,navigate) => {
  dispatch(updateProfileStart());
  try {
    const result = await updateCurrentProfileUser(data);
    if (result.status === 200) {
      dispatch(loginSuccess(result.data.data));
      navigate(`@${result.data.data.nickname}`);
    }
  } catch (error) {
    dispatch(updateProfileFailed(error));
  }
};
