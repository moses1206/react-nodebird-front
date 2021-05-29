import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const followerList = [
    { nickname: "Zerocho1" },
    { nickname: "BaBo1" },
    { nickname: "NodeBird1" },
  ];

  const followingList = [
    { nickname: "Zerocho2" },
    { nickname: "BaBo2" },
    { nickname: "NodeBird2" },
  ];

  return (
    <AppLayout>
      <Head>
        <title>MyProfile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followingList} />
      <FollowList header="팔로워 목록" data={followerList} />
    </AppLayout>
  );
};

export default Profile;
