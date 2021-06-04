import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

import styles from '../styles/AppLayout.module.css';

// antd 의 문제점을 해결할 수 있다.
const Global = createGlobalStyle`
.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;  
}

.ant-col::first-child {
  padding-left: 0 !important;
}

.ant-col::last-child{
  padding-right:0 !important
}
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="1">
          <Link href="/">
            <a>NodeBird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Input.Search className={styles.vertialMiddle} enterButton />
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com"
            // 새창에서 열기
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
