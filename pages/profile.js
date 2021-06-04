import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>MyProfile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={me.Followings} />
      <FollowList header="팔로워" data={me.Followers} />
    </AppLayout>
  );
};

export default Profile;
