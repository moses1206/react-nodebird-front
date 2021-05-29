import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      <h2>Hello NodeBird</h2>
    </AppLayout>
  );
};
export default Home;
