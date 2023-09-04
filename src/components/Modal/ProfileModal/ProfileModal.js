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
  const [inputFirstname, setInputFirstname] = useState('');
  const [inputLastname, setInputLastname] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const saveRef = useRef(null);
  const inputFileRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const bioRef = useRef(null);
  const countRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsClosed(!isClosed);
    setTimeout(() => {
      onHideModal();
    }, 290);
  };
  useEffect(() => {
    if (!inputFirstname) {
      firstNameRef.current.value = currUser.first_name;
    }
    if (!inputLastname) {
      lastNameRef.current.value = currUser.last_name;
    }
    if (!areaInputBio) {
      bioRef.current.value = currUser.bio;
    }
  }, [areaInputBio, inputFirstname, inputLastname]);

  const handleChangeFirstname = (e) => {
    currUser.first_name !== e.target.value ? setIsDisabled(false) : setIsDisabled(true);
    setInputFirstname(e.target.value);
  };
  const handleChangeLastname = (e) => {
    currUser.last_name !== e.target.value ? setIsDisabled(false) : setIsDisabled(true);
    setInputLastname(e.target.value);
  };
  const handleChangeAreaInputBio = (e) => {
    currUser.bio !== e.target.value ? setIsDisabled(false) : setIsDisabled(true);
    if (e.target.value.length > 80) {
      countRef.current.style.color = '#fe2c55';
      bioRef.current.style.outline = '1px solid #fe2c55';
      setIsDisabled(true);
    } else if (isDisabled && e.target.value.length <= 80) {
      bioRef.current.style.outline = 'none';
      countRef.current.style.color = 'currentColor';
      setIsDisabled(false);
    }
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
    formData.append('first_name', inputFirstname);
    formData.append('last_name', inputLastname);
    formData.append('bio', areaInputBio);
    if (file) {
      formData.append('avatar', file);
    }
    await updateProfile(formData, dispatch, navigate);
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
                    <div className={cx('label')}>Frist Name</div>
                    <div className={cx('edit-area-container')}>
                      <input
                        value={inputFirstname}
                        type="text"
                        className={cx('input-text')}
                        placeholder="Username"
                        onChange={handleChangeFirstname}
                        ref={firstNameRef}
                      />
                      <p className={cx('username-url')}>{`clone-tiktok-app.netlify.app/@${currUser.nickname}`}</p>
                      <p className={cx('username-desc')}>
                        Usernames can only contain letters, numbers, underscores, and periods. Changing your username
                        will also change your profile link.
                      </p>
                    </div>
                  </div>
                  <div className={cx('name-container')}>
                    <div className={cx('label')}>Last Name</div>
                    <div className={cx('edit-area-container')}>
                      <input
                        value={inputLastname}
                        type="text"
                        placeholder="Name"
                        className={cx('input-text')}
                        onChange={handleChangeLastname}
                        ref={lastNameRef}
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
                        value={areaInputBio}
                        ref={bioRef}
                      ></textarea>
                      <div className={cx('text-count')}>
                        <span ref={countRef}>
                          {bioRef.current?.value?.length.toString() || currUser.bio.length.toString()}/
                        </span>
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
