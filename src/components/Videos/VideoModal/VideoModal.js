import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
import { IconSearch } from '~/components/Icons';
import video from '~/assets/videos';

const cx = classNames.bind(styles);

const VideoModal = () => {
  return (
    <div className={cx('modal-container')}>
      <div className={cx('video-container')}>
        <div className={cx('search-bar-container')}>
          <div className={cx('search-bar-background')}></div>
          <div className={cx('search-box-container')}>
            <div className={cx('search-input-container')}>
              <input type="text" placeholder="Tìm nội dung liên quan" className={cx('input-search-content')} />
              <span className={cx('span-spliter')}></span>
              <button className={cx('btn-search')}>
                <div className={cx('search-icon-container')}>
                  <IconSearch className={cx('custom-btn-search')} />
                </div>
              </button>
              <div className={cx('input-border-container')}></div>
            </div>
          </div>
        </div>
        <div className={cx('video-blur-background')}>
          <span className={cx('wrapper-picture')}>
            <picture>
              <source
                type="image/avif"
                srcSet="https://p19-sign.tiktokcdn-us.com/tos-useast5-p-0068-tx/3703fb8fc64049ae873d52cb01c6da7f_1690727980~tplv-photomode-zoomcover:720:720.avif?x-expires=1695481200&amp;x-signature=Mq5a0CrepvASL8ueq04MY1kYsTw%3D"
                src="https://p19-sign.tiktokcdn-us.com/tos-useast5-p-0068-tx/3703fb8fc64049ae873d52cb01c6da7f_1690727980~tplv-photomode-zoomcover:720:720.avif?x-expires=1695481200&amp;x-signature=Mq5a0CrepvASL8ueq04MY1kYsTw%3D"
              />
              <img
                loading="lazy"
                decoding="async"
                srcSet="https://p16-sign.tiktokcdn-us.com/obj/tos-useast5-p-0068-tx/3703fb8fc64049ae873d52cb01c6da7f_1690727980?x-expires=1695481200&amp;x-signature=sDVws9ms6TOqIOJXtRJey4z6Umk%3D"
                src="https://p16-sign.tiktokcdn-us.com/obj/tos-useast5-p-0068-tx/3703fb8fc64049ae873d52cb01c6da7f_1690727980?x-expires=1695481200&amp;x-signature=sDVws9ms6TOqIOJXtRJey4z6Umk%3D"
                imagex-type="react"
                imagex-version="0.3.7"
                className={cx('custom-image')}
              />
            </picture>
          </span>
        </div>
        <div className={cx('video-wrapper')}>
          <div className={cx('video-background-blur')}>
            <div className={cx('video-layout-wrapper')}>
              <video controls className={cx('video-custom')} src={video.rinka} />
            </div>
          </div>
        </div>
        <button className={cx('close-btn-container')}></button>
        <div className={cx('volume-controller')}></div>
        <button className={cx('arrow-video-switch')}></button>
        <button className={cx('arrow-video-switch')}></button>
        <button className={cx('menu-btn-container')}></button>
      </div>
      <div className={cx('content-container')}>
        <div className={cx('description-content-wrapper')}></div>
        <div className={cx('main-content')}></div>
        <div className={cx('comment-content-container')}></div>
        <div className={cx('edit-comment-container')}></div>
      </div>
    </div>
  );
};

export default VideoModal;
