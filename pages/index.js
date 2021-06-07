import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../reducers/types';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  // 스크롤이 어느정도 내려오면 데이터를 불러오는 기능
  // 밑에서 300px정도 남았을때 데이터를 불러오게 하고싶다.!
  useEffect(() => {
    function onScroll() {
      if (
        // scrollY : 얼마나 내렸는지 , clientHeight: 화면의 높이 , scrollHeight: 총길이
        // scrollY + clientHeight = scrollHeight -300 ==> 끝에서 300px 남은 지점에서 LOAD POST REQUEST를 실행
        // eslint-disable-next-line operator-linebreak
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 500
      ) {
        // hasMorePosts 가 true 이면서 loading이 아닐때만 가져와라
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
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
  }, [hasMorePosts, loadPostLoading]);

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
export default Home;
