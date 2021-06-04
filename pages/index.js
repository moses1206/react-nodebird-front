import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      {isLoggedIn && <PostForm />}
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
