import React, { useCallback, useEffect } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/types';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  // 1. 작성자의 아이디와 내 아이디가 같으면 팔로운 버튼을 지운다.
  if (post.User.id === me.id) {
    return null;
  }

  //  2. 로그인이 되어있고 Followings리스트에서 post.User.id 와 같은사람이 있는지 찾는다.
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        // 팔로우 할사람의 아이디만 있으면 팔로우/언팔로우 할수 있으므로
        // data에 User.id를 보낸다.
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {/* 내가 팔로잉 안한 사람만 팔로우가 보이도록 */}
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
