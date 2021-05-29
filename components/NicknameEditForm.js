import React from "react";
import { Form, Input } from "antd";
import styles from "../styles/NicknameEditForm.module.css";

const NicknameEditForm = () => {
  return (
    <Form className={styles.container}>
      <Input.Search addonBefore="NickName" enterButton="Edit" />
    </Form>
  );
};

export default NicknameEditForm;
