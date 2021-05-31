import React, { useCallback, useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/PostForm.module.css";

import { addPost } from "../reducers/post";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);

  const imageInput = useRef();

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      className={styles.form}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          className={styles.btnContainer}
          htmlType="submit"
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} className={styles.imgContainer}>
              <img
                src={"http://localhost:3065/" + v}
                className={styles.img}
                alt={v}
              />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
