import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import * as requestStateFollow from '~/services/followService';
import Button from '~/components/Button/Button';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCurrentVideoId, handleRequestFollow, handleRequestUnFollow } from '~/redux/followSlice';

const cx = classNames.bind(styles);

const Follow = ({ userId, isCurrStateFollow, profile = false, onShowModalForm = () => {}, isLogin = true }) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(isCurrStateFollow);
  const { currentUserId, isChangeFollow, stateFollow, synchronizedFollow } = useSelector((state) => state.follow);

  useLayoutEffect(() => {
    setIsFollowed(isCurrStateFollow);
  }, [userId]);

  useEffect(() => {
    if (userId === currentUserId) {
      synchronizedFollow && setIsFollowed(stateFollow);
    }
  }, [isChangeFollow]);

  const handleChangeStateFollow = () => {
    dispatch(handleCurrentVideoId(userId));
    if (!isFollowed) {
      (async () => {
        setIsFollowed(true);
        dispatch(handleRequestFollow());
        await requestStateFollow.followedUser(userId);
      })();
    } else {
      (async () => {
        setIsFollowed(false);
        dispatch(handleRequestUnFollow());
        await requestStateFollow.unFollowedUser(userId);
      })();
    }
  };

  return (
    <div>
      {isFollowed ? (
        <Button
          primary
          onClick={isLogin ? handleChangeStateFollow : onShowModalForm}
          className={cx('Following', {
            profileFollowing: profile,
          })}
        >
          Following
        </Button>
      ) : (
        <Button
          primary
          outline
          onClick={isLogin ? handleChangeStateFollow : onShowModalForm}
          className={cx('Follow', {
            profileUnfollow: profile,
          })}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Follow;
