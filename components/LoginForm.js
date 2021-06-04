import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/LoginForm.module.css';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  // Import Data
  const { logInLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(
      loginRequestAction({
        email,
        password,
      })
    );
  }, [email, password]);

  return (
    <Form className={styles.p2} onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">아이디</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입하기</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
