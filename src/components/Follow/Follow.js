import classNames from 'classnames/bind';
import styles from './Follow.module.scss';
import * as requestStateFollow from '~/services/followService';
import Button from '~/components/Button/Button';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCurrentVideoId, handleRequestFollow, handleRequestUnFollow } from '~/redux/followSlice';

const cx = classNames.bind(styles);

const Follow = (props) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(props.isCurrStateFollow);

  const { currentUserId, isChangeFollow, stateFollow, synchronizedFollow } = useSelector((state) => state.follow);

  useLayoutEffect(() => {
    setIsFollowed(props.isCurrStateFollow);
  }, [props.userId]);

  useEffect(() => {
    if (props.userId === currentUserId) {
      synchronizedFollow && setIsFollowed(stateFollow);
    }
  }, [isChangeFollow]);

  const handleChangeStateFollow = () => {
    dispatch(handleCurrentVideoId(props.userId));
    if (!isFollowed) {
      (async () => {
        setIsFollowed(true);
        dispatch(handleRequestFollow());
        await requestStateFollow.followedUser(props.userId);
      })();
    } else {
      (async () => {
        setIsFollowed(false);
        dispatch(handleRequestUnFollow());
        await requestStateFollow.unFollowedUser(props.userId);
      })();
    }
  };

  return (
    <div>
      {isFollowed ? (
        <Button primary onClick={handleChangeStateFollow} className={cx('Following')}>
          Following
        </Button>
      ) : (
        <Button primary outline onClick={handleChangeStateFollow} className={cx('Follow')} >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Follow;
