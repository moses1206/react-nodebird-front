/* eslint-disable react/require-default-props */
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import PropTypes from 'prop-types';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    // True를 False로 False를 True로
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  // 있나없나 검사하고 싶을땐 옵셔널 체이닝 연산자사용(optional chaining 사용)
  const id = useSelector((state) => state.user.me && state.user.me.id);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={
          // 배열안에 jsx 를 넣을땐는 반드시 Key를 입력해야한다.
          [
            <RetweetOutlined key="retweet" />,
            liked ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                key="heart"
                onClick={onToggleLike}
              />
            ) : (
              <HeartOutlined key="heart" onClick={onToggleLike} />
            ),
            <MessageOutlined key="comment" onClick={onToggleComment} />,
            <Popover
              key="more"
              content={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Button.Group>
                  {/* 수정 , 삭제는 내가 쓴 글만 가능하도록 해야한다. */}
                  {/* 로그인을 했고 내 아이디가 post의 userid와 같다면 수정삭제 할수 있게 */}
                  {id && post.User.id === id ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  ) : (
                    <Button>신고</Button>
                  )}
                </Button.Group>
              }
            >
              <EllipsisOutlined />
            </Popover>,
          ]
        }
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          {/* 코멘트폼에 포스트를 넘겨줘야하는 이유는 어떤글에 댓글을 달건지 정보를 넘겨줘야한다.  */}
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
