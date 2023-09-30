import * as httpRequest from '~/utils/httpRequest';

export const videoService = async (randomPage, type = 'for-you') => {
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type,
        page: randomPage,
      },
    });
    return {
      data: res.data,
      meta: res.meta.pagination.total_pages,
    };
  } catch (err) {
    return err;
  }
};

export const getVideo = async (videoId) => {
  try {
    const res = await httpRequest.get(`videos/${videoId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getListVideoOfUser = async (userId) => {
  try {
    if (!userId) return;
    const res = await httpRequest.get(`users/${userId}/videos`);
    return res.data;
  } catch (error) {
    return error;
  }
};
