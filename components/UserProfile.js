import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {me.Posts && me.Posts.length}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {me.Followings && me.Followings.length}
          </div>,
          <div key="followings">
            팔로워
            <br />
            {me.Followers && me.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogout} loading={logOutLoading}>
          LogOut
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
