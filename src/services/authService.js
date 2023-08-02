import * as httpRequest from '~/utils/httpRequest';

export const userRegister = async ({ email, password }) => {
  try {
    const res = await httpRequest.post('auth/register', {
      type: 'email',
      email,
      password,
    });
    return res;
  } catch (err) {
    return err;
  }
};
export const userLogin = async ({ email, password }) => {
  try {
    const res = await httpRequest.post('auth/login', {
      email,
      password,
    });
    return res;
  } catch (err) {
    return err;
  }
};
