import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      <AppLayout />
      Hello, Next!!
    </div>
  );
};
export default Home;
