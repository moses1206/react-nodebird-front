import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Server Side Rendering
import { END } from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';
import wrapper from '../../store/configureStore';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_MY_INFO_REQUEST, LOAD_POST_REQUEST } from '../../reducers/types';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('getServerSideProps Start');
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    // 쿠키 공유를 막기위해
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // 사용자 정보 받아오기
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 단일 게시글 내용 불러오기
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      //   post/2  여기서 post 아이디 2를 context.params.id로 불러올 수 있다.
      data: context.params.id,
    });

    context.store.dispatch(END);
    console.log('getServerSideProps End!');
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
