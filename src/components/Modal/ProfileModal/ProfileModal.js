import classNames from 'classnames/bind';
import styles from './ProfileModal.module.scss';
import { CancelIcon, EditPhoto } from '~/components/Icons';
import Button from '~/components/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '~/redux/apiRequests';
import Image from '~/components/Images/Images';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProfileModal = ({ onHideModal, isShowing }) => {
  const currUser = useSelector((state) => state.auth.login.currentUser);

  const [file, setFile] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(currUser.avatar);
  const [isClosed, setIsClosed] = useState(false);
  const [areaInputBio, setAreaInputBio] = useState('');
  const [inputUsername, setInputUserName] = useState('');
  const [inputName, setInputname] = useState('');
  const [isInputText, setIsInputText] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const inputUsernameRef = useRef(null);
  const saveRef = useRef(null);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsClosed(!isClosed);
    setTimeout(() => {
      onHideModal();
    }, 290);
  };

  // useEffect(() => {
  //   // const updateProfileUser = async () => {
  //   //   await updateProfile();
  //   // };
  //   // updateProfileUser();

  // }, [selectedAvatar]);

  const handleChangeInputUsername = (e) => {
    setInputUserName(e.target.value);
    e.target.value && setIsInputText(true);
  };
  const handleChangeInputName = (e) => {
    setInputname(e.target.value);
  };
  const handleChangeAreaInputBio = (e) => {
    setAreaInputBio(e.target.value);
  };

  const handleSelectedAvatar = () => {
    if (!inputFileRef.current.files || !inputFileRef.current.files.length) {
      // setSelectedAvatar(currUser.avatar);
      return;
    }
    const objectUrl = URL.createObjectURL(inputFileRef.current.files[0]);
    setSelectedAvatar(objectUrl);
    setFile(inputFileRef.current.files[0]);
    setIsDisabled(false);
  };
  const handleClickChangeInput = () => {
    inputFileRef.current.click();
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    setIsDisabled(true);
    if (file) {
      formData.append('avatar', file);
      await updateProfile(formData, dispatch, navigate);
    }
    window.location.reload();
  };
  return (
    <>
      <div
        className={cx('modal-backdrop', {
          animationShowBackdrop: isShowing,
          animationHideBackdrop: isClosed,
        })}
      ></div>
      <div className={cx('modal-profile-container')}>
        <div className={cx('modal-content-vertical')}>
          <div className={cx('modal-content-vertical-padding')}>
            <section
              className={cx('modal-content-section', {
                animationShow: !isClosed,
                animationHide: isClosed,
              })}
            >
              <div className={cx('modal-container')}>
                <div className={cx('edit-profile-header')}>
                  <h1 className={cx('label')}>Edit profile</h1>
                  <div className={cx('close-container')} onClick={handleCloseModal}>
                    <CancelIcon className={cx('custom-icon')} />
                  </div>
                </div>
                <div className={cx('container-content')}>
                  <div className={cx('item-container')}>
                    <div className={cx('label')}>Profile photo</div>
                    <div className={cx('edit-photo')}>
                      <div className={cx('wrapper-avatar')} onClick={handleClickChangeInput}>
                        <Image src={selectedAvatar.toString()} alt="avatar" />
                      </div>
                      <div className={cx('edit-wrapper')} onClick={handleClickChangeInput}>
                        <div className={cx('edit-icon')}>
                          <EditPhoto />
                        </div>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                          className={cx('input-upload')}
                          onChange={handleSelectedAvatar}
                          ref={inputFileRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx('username-container')}>
                    <div className={cx('label')}>Username</div>
                    <div className={cx('edit-area-container')}>
                      <input
                        value={isInputText ? inputUsername : currUser.nickname}
                        type="text"
                        className={cx('input-text')}
                        placeholder="Username"
                        onChange={handleChangeInputUsername}
                      />
                      <p className={cx('username-url')} ref={inputUsernameRef}>{`clone-tiktok-app.netlify.app/@${
                        isInputText ? inputUsername : currUser.nickname
                      }`}</p>
                      <p className={cx('username-desc')}>
                        Usernames can only contain letters, numbers, underscores, and periods. Changing your username
                        will also change your profile link.
                      </p>
                    </div>
                  </div>
                  <div className={cx('name-container')}>
                    <div className={cx('label')}>Name</div>
                    <div className={cx('edit-area-container')}>
                      <input
                        value={inputName || `${currUser.last_name} ${currUser.first_name}`}
                        type="text"
                        placeholder="Name"
                        className={cx('input-text')}
                        onChange={handleChangeInputName}
                      />
                      <p className={cx('name-desc')}>Your nickname can only be changed once every 7 days.</p>
                    </div>
                  </div>
                  <div className={cx('bio-container')}>
                    <div className={cx('label')}>Bio</div>
                    <div className={cx('edit-area-container')}>
                      <textarea
                        onChange={handleChangeAreaInputBio}
                        className={cx('input-textarea')}
                        placeholder="Bio"
                        value={areaInputBio || currUser.bio}
                      ></textarea>
                      <div className={cx('text-count')}>
                        <span>62/</span>
                        80
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('footer-container')}>
                  <Button outline primary className={cx('custom-btn')} onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button
                    outline
                    primary
                    className={cx('custom-btn', { 'custom-disable': isDisabled, ability: !isDisabled })}
                    disable={isDisabled}
                    refBtn={saveRef}
                    onClick={handleSaveProfile}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
