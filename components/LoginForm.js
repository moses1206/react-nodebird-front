import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";

import Link from "next/link";
import styles from "../styles/LoginForm.module.css";

import useInput from "../hooks/useInput";
import { loginAction } from "../reducers";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <Form className={styles.p2} onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
