import * as httpRequest from '~/utils/httpRequest';

export const videoService = async (randomPage, type = 'for-you') => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page: randomPage,
            }
        })
        return {
            data: res.data,
            meta: res.meta.pagination.total_pages,
        };
    } catch (err) {
        return err;
    }
}