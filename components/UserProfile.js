import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <div>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />0
          </div>,
          <div key="followings">
            팔로잉
            <br />0
          </div>,
          <div key="followings">
            팔로워
            <br />0
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogout} loading={isLoggingOut}>
          LogOut
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
