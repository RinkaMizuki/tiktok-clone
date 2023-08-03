import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async (page = 1, per_page = 15) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getFollowed = async (page = 1) => {
  try {
    const res = await httpRequest.get('me/followings', {
      params: {
        page,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get('auth/me');
    return res;
  } catch (error) {
    return error;
  }
};

export const getCurrentProfileUser = async (nickname) => {
  try {
    const res = await httpRequest.get(`users${nickname}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateCurrentProfileUser = async (data) => {
  try {
    const res = await httpRequest.post(`auth/me`, data, {
      params: {
        _method: 'PATCH',
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
