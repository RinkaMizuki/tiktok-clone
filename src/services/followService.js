import httpRequest from '~/utils/httpRequest';

export const followedUser = async (userId) => {
  try {
    const res = await httpRequest.post(`users/${userId}/follow`);
    return res;
  } catch (error) {
    return error;
  }
};

export const unFollowedUser = async (userId) => {
  try {
    const res = await httpRequest.post(`users/${userId}/unfollow`);
    return res;
  } catch (error) {
    return error;
  }
};
