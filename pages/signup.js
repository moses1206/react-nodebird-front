import React, { useState, useCallback } from "react";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import AppLayout from "../components/AppLayout";

import useInput from "../hooks/useInput";
import styles from "../styles/SignUp.module.css";

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
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
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>SignUp | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">UserID</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
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
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
