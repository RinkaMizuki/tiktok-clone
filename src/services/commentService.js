import * as httpRequest from '~/utils/httpRequest';

export const getListComment = async (videoId) => {
  try {
    const res = await httpRequest.get(`videos/${videoId}/comments`);
    return res.data;
  } catch (error) {
    return error;
  }
};
