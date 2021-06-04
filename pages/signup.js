import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';

import useInput from '../hooks/useInput';
import styles from '../styles/SignUp.module.css';
import { SIGN_UP_REQUEST } from '../reducers/types';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState('');
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password, nickname } });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>SignUp | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">User Email</label>
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
          <label htmlFor="user-nickname">UserNickName</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password-check">Password Check</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            type="password"
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && (
            <div className={styles.error}>비밀번호가 일치하지 않습니다!!</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            난 프로그래머가 될 수 있습니다.!!
          </Checkbox>
          {termError && (
            <div className={styles.error}>동의를 해야만합니다.!!</div>
          )}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            Register
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
