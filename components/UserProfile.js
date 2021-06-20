import React, { useCallback } from 'react';
import Link from 'next/link';
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
            <Link href={`/user/${me.id}`}>
              <a>
                짹짹
                <br />
                {me.Posts && me.Posts.length}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                팔로잉
                <br />
                {me.Followings && me.Followings.length}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                팔로워
                <br />
                {me.Followers && me.Followers.length}
              </a>
            </Link>
          </div>,
        ]}
      >
        <Card.Meta
          avatar={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Link href={`/user/${me.id}`}>
              <a>
                <Avatar>{me.nickname[0]}</Avatar>
              </a>
            </Link>
          }
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
