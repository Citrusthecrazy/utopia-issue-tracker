import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Login, QuestionForm } from "../components";
import { Header } from "../widgets";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Utopia Issue Tracker by Citrus</title>
        <meta
          name="description"
          content="Aplikacija za pracenje problema na Utopia RP serveru"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      <main className="relative bg-sky-900 h-screen w-screen text-white flex flex-col items-center justify-center overflow-x-hidden md:px-16">
        {(session || status !== "loading") && <Header />}
        <h1 className="text-[2rem] md:text-[5rem] xl:text-[6rem] font-bold mb-16">
          Utopia problemi
        </h1>
        {!session ? <Login /> : <QuestionForm />}
      </main>
    </>
  );
};

export default Home;
