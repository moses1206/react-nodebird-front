/* eslint-disable react/require-default-props */
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from '../reducers/types';

// 모멘트를 한글로 바꾸어준다.
moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  // 있나없나 검사하고 싶을땐 옵셔널 체이닝 연산자사용(optional chaining 사용)
  // const id = useSelector((state) => state.user.me?.id);
  // 내 아이디를 가져온 다음
  const id = useSelector((state) => state.user.me && state.user.me.id);
  // 거기에 좋아요를 누른 아이디에 내 아이디가 있는지
  const liked = post.Likers.find((v) => v.id === id);
  const { removePostLoading } = useSelector((state) => state.post);

  // Like UnLike는 사용자와 게시글의 관계이다. userId postId가 필요한데
  // postId는 props로 받고 사용자 아이디는 패스포트에서 req.user에서 받는다.
  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.!!');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.!!');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다. !!');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다. !!');
    }

    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={
          // 배열안에 jsx 를 넣을땐는 반드시 Key를 입력해야한다.
          [
            <RetweetOutlined key="retweet" onClick={onRetweet} />,
            liked ? (
              // 좋아요를 누른 아이디에 내 아이디가 있다면 Unlike
              <HeartTwoTone
                twoToneColor="#eb2f96"
                key="heart"
                onClick={onUnlike}
              />
            ) : (
              // 없다면 Like
              <HeartOutlined key="heart" onClick={onLike} />
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
                      <Button
                        type="danger"
                        onClick={onRemovePost}
                        loading={removePostLoading}
                      >
                        삭제
                      </Button>
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
        title={
          post.RetweetId
            ? `${post.User.nickname}님이 리트윗하셨습니다. !!`
            : null
        }
        // /////////////////// 팔로우/팔로잉 버튼/////////////////////////////
        // 로그인을 했을때만 팔로우 버튼이 보여야한다.
        extra={id && <FollowButton post={post} />}
        // /////////////////// 팔로우/팔로잉 버튼/////////////////////////////
      >
        {/* 리트윗한 게시글의 아이디와 리트윗이 있다면 */}
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD , a h:mm:ss')}
            </div>
            <Card.Meta
              avatar={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD , a h:mm:ss')}
            </div>
            <Card.Meta
              avatar={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          {/* 코멘트폼에 포스트를 넘겨줘야하는 이유는 어떤글에 댓글을 달건지 정보를 넘겨줘야한다.  */}
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={() => (
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  )}
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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }),
};

export default PostCard;
