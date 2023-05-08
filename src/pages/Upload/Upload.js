import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { useEffect, useRef, useState } from 'react';
import image from '~/assets/images';
//storage
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { UserAuth } from '~/context/AuthContext';
import Button from '~/components/Button/Button';
import { CaretDown } from '~/components/Icons';
const cx = classNames.bind(styles);

function Upload() {
  //state
  const [videoUrl, setVideoUrl] = useState(null);
  const inputRef = useRef();
  //upload video
  const { setVideoList } = UserAuth();
  const storage = getStorage();
  useEffect(() => {
    if (videoUrl == null) return;
    else {
      const mountainVideoRef = ref(storage, `Videos/${videoUrl.name + v4()}`);
      uploadBytes(mountainVideoRef, videoUrl).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  const handleClickUpload = () => {
    inputRef.current.click();
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('layout')}>
        <div className={cx('sub-layout')}>
          <div className={cx('upload-container')}>
            <div className={cx('uploader')}>
              <div className={cx('upload')}>
                <input ref={inputRef} type="file" accept="video/*" onChange={(e) => setVideoUrl(e.target.files[0])} />
                <div className={cx('upload-card')} onClick={handleClickUpload}>
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCA0MCAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41MDAxIDI5SDMwLjVDMzUuNzQ2NyAyOSA0MCAyNC43NDY3IDQwIDE5LjVDNDAgMTQuNzExNSAzNi40NTcxIDEwLjc1MDQgMzEuODQ5NyAxMC4wOTUxQzMwLjkzNyA0LjM3Mjk3IDI1Ljk3OTIgMCAyMCAwQzEzLjM3MjYgMCA4IDUuMzcyNTggOCAxMkw4LjAwMDAxIDEyLjAxNDVDMy41MzgzMSAxMi4yNzMzIDAgMTUuOTczNCAwIDIwLjVDMCAyNS4xOTQ0IDMuODA1NTggMjkgOC41IDI5SDE4LjUwMDFWMTcuMTIxM0wxNS45MTQzIDE5LjcwNzFDMTUuNzE5MSAxOS45MDI0IDE1LjQwMjUgMTkuOTAyNCAxNS4yMDcyIDE5LjcwNzFMMTMuNzkzIDE4LjI5MjlDMTMuNTk3NyAxOC4wOTc2IDEzLjU5NzcgMTcuNzgxIDEzLjc5MyAxNy41ODU4TDE4LjkzOTUgMTIuNDM5M0MxOS41MjUyIDExLjg1MzYgMjAuNDc1IDExLjg1MzYgMjEuMDYwOCAxMi40MzkzTDI2LjIwNzIgMTcuNTg1OEMyNi40MDI1IDE3Ljc4MSAyNi40MDI1IDE4LjA5NzYgMjYuMjA3MiAxOC4yOTI5TDI0Ljc5MyAxOS43MDcxQzI0LjU5NzcgMTkuOTAyNCAyNC4yODEyIDE5LjkwMjQgMjQuMDg1OSAxOS43MDcxTDIxLjUwMDEgMTcuMTIxM1YyOVoiIGZpbGw9IiMxNjE4MjMiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K" alt="upload" />
                  <div className={cx('text-main')}>
                    <span>Select video to upload</span>
                  </div>
                  <div className={cx('text-drap-drop')}>
                    <span>Or drag and drop a file</span>
                  </div>
                  <div className={cx('text-sub')}>
                    <span>Long videos can be split into multiple parts to get more exposure</span>
                  </div>
                  <div className={cx('text-video-info')}>
                    <div>
                      <span>MP4 or WebM</span>
                    </div>
                    <div className={cx('text-video-size')}>
                      <span>720x1280 resolution or higher</span>
                    </div>
                    <div className={cx('text-video-time')}>
                      <span>Up to 30 minutes</span>
                    </div>
                    <div className={cx('text-video-rule')}>
                      <span>Less than 2 GB</span>
                    </div>
                  </div>
                  <Button primary large className={cx('btn-upload-file')}>Select file</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx('center-footer')}>
          <div className={cx('container-footer')}>
            <div className={cx('footer-content-wrapper')}>
              <div className={cx('tiktok-logo')}>
                <img src={image.logoLight} alt="logo-tiktok" />
              </div>
              <div className={cx('footer-content-column')}>
                <h4>Company</h4>
                <span>
                  <a href="#" className={cx('item-sub-column')}>About</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Newsroom</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Contact</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Careers</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>ByteDance</a>
                </span>
              </div>
              <div className={cx('footer-content-column')}>
                <h4>Programs</h4>
                <span>
                  <a href="#" className={cx('item-sub-column')}>TikTok for Good</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Advertise</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Developers</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>TikTok Rewards</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>TikTok Browse</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>TikTok Embeds</a>
                </span>
              </div>
              <div className={cx('footer-content-column')}>
                <h4>Support</h4>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Help Center</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Safety Center</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Creator Portal</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Community Guidelines</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Transparency</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Accessibility</a>
                </span>
              </div>
              <div className={cx('footer-content-column')}>
                <h4>Legal</h4>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Terms of Use</a>
                </span>
                <span>
                  <a href="#" className={cx('item-sub-column')}>Privacy Policy</a>
                </span>
              </div>
            </div>

            <div className={cx('footer-bottom-wrapper')}>
              <div className={cx('language-selection')}>
                <p>English</p>
                <CaretDown />
                <select className={cx('language-selection-form')}>
                  <option value="ar">العربية</option>
                  <option value="bn-IN">বাঙ্গালি (ভারত)</option>
                  <option value="ceb-PH">Cebuano (Pilipinas)</option>
                  <option value="cs-CZ">Čeština (Česká republika)</option>
                  <option value="de-DE">Deutsch</option>
                  <option value="el-GR">Ελληνικά (Ελλάδα)</option>
                  <option selected="" value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fi-FI">Suomi (Suomi)</option>
                  <option value="fil-PH">Filipino (Pilipinas)</option>
                  <option value="fr">Français</option>
                  <option value="he-IL">עברית (ישראל)</option>
                  <option value="hi-IN">हिंदी</option>
                  <option value="hu-HU">Magyar (Magyarország)</option>
                  <option value="id-ID">Bahasa Indonesia (Indonesia)</option>
                  <option value="it-IT">Italiano (Italia)</option>
                  <option value="ja-JP">日本語（日本）</option>
                  <option value="jv-ID">Basa Jawa (Indonesia)</option>
                  <option value="km-KH">ខ្មែរ (កម្ពុជា)</option>
                  <option value="ko-KR">한국어 (대한민국)</option>
                  <option value="ms-MY">Bahasa Melayu (Malaysia)</option>
                  <option value="my-MM">မြန်မာ (မြန်မာ)</option>
                  <option value="nl-NL">Nederlands (Nederland)</option>
                  <option value="pl-PL">Polski (Polska)</option>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="ro-RO">Română (Romania)</option>
                  <option value="ru-RU">Русский (Россия)</option>
                  <option value="sv-SE">Svenska (Sverige)</option>
                  <option value="th-TH">ไทย (ไทย)</option>
                  <option value="tr-TR">Türkçe (Türkiye)</option>
                  <option value="uk-UA">Українська (Україна)</option>
                  <option value="ur">اردو</option>
                  <option value="vi-VN">Tiếng Việt (Việt Nam)</option>
                  <option value="zh-Hans">简体中文</option>
                  <option value="zh-Hant-TW">繁體中文</option>
                </select>
              </div>

              <div className={cx('copyright')}>
                <span>© 2023 TikTok</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Upload;
