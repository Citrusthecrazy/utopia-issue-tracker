import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { trpc } from "../utils/trpc";
import Header from "../widgets/Header";

const Home: NextPage = () => {
  const { data: session } = useSession();
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
      <main className="relative bg-sky-900 h-screen w-screen text-white flex flex-col items-center justify-center">
        {session && <Header />}
        <h1 className="text-[6rem] font-bold mb-16">Utopia problemi</h1>
        {!session ? <Login /> : <QuestionForm />}
      </main>
    </>
  );
};

const Login = () => {
  return (
    <>
      <p className="text-[2.5rem] mb-8">Niste prijavljeni</p>
      <button
        className="text-[2rem] bg-sky-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg"
        onClick={() => signIn()}>
        Prijavite se putem Discord-a
      </button>
    </>
  );
};

const QuestionForm = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const sendQuestion = trpc.useMutation(["issue.createIssue"]);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (issueTitle === "" || issueDescription === "")
      return toast.error("Popunite sva polja!");
    sendQuestion.mutate({ issueTitle, issueDescription });

    setIssueTitle("");
    setIssueDescription("");
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleOnSubmit(e)}>
      <input
        className="pl-2 w-full min-w-[730px] focus:outline-none text-sky-900 text-lg rounded-sm"
        type="text"
        placeholder="Naslov problema"
        value={issueTitle}
        onChange={(e) => setIssueTitle(e.target.value)}
      />
      <textarea
        className="pl-2 w-full min-w-[730px] focus:outline-none text-sky-900 text-lg rounded-sm resize-none"
        rows={10}
        placeholder="Opis problema"
        value={issueDescription}
        onChange={(e) => setIssueDescription(e.target.value)}
      />
      <button
        type="submit"
        className="bg-sky-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg w-32 text-xl font-semibold">
        Posalji
      </button>
      {sendQuestion.error && (
        <p className="bg-red-700 px-4 py-2 font-semibold">
          {sendQuestion.error.message}!
        </p>
      )}
    </form>
  );
};

export default Home;
