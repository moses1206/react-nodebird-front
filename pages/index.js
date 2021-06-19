import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

// Server Side Rendering
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from '../reducers/types';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  // eslint-disable-next-line operator-linebreak
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  // 스크롤이 어느정도 내려오면 데이터를 불러오는 기능
  // 밑에서 300px정도 남았을때 데이터를 불러오게 하고싶다.!
  useEffect(() => {
    function onScroll() {
      if (
        // scrollY : 얼마나 내렸는지 , clientHeight: 화면의 높이 , scrollHeight: 총길이
        // scrollY + clientHeight = scrollHeight -300 ==> 끝에서 300px 남은 지점에서 LOAD POST REQUEST를 실행
        // eslint-disable-next-line operator-linebreak
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        // hasMorePosts 가 true 이면서 loading이 아닐때만 가져와라
        if (hasMorePosts && !loadPostsLoading) {
          // MainPosts의 마지막 게시글의 아이디를 lastId에 담는다.
          // 게시글이 9개면 10개씩 불러오므로 lastId가 undefined가 된다.
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    // 윈도우에서 window를 사용할때는 반드시 return을 사용하여
    // 메모리를 사용하고 있는것을 초기화해주어야한다.
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      {me && <PostForm />}
      {/* 리액트에서 map 을 사용해야할때 index를 키를 쓰면 안된다 */}
      {/* 특히 게시글이 지워지거나, 순서가 달라지거나,중간에 추가될때는 key를 index로 */}
      {/* 써서는 안된다. */}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// Server Side Rendering
// Home보다 먼저 실행된다.
// getServerSideProps가 실행되면 store의 변화가 일어나고 Case HYDRATE가 실행된다.
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('getServerSideProps Start');
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    // 쿠키 공유를 막기위해
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps End!');
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
