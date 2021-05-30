import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { logoutAction } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
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
        <Card.Meta avatar={<Avatar>BH</Avatar>} title="JBH" />
        <Button onClick={onLogout}>LogOut</Button>
      </Card>
    </div>
  );
};

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
