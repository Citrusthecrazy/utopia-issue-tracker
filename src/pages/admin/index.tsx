import { Issue } from "@prisma/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { FC, useState } from "react";
import { IssueCard, PageLoading, Unauthorized } from "../../components";
import { trpc } from "../../utils/trpc";
import { Header } from "../../widgets";

const Admin = () => {
  const { data: session, status } = useSession();
  const user = trpc.useQuery(["user.getUser"]);
  const [searchFilter, setSearchFilter] = useState("");
  const statusMutation = trpc.useMutation(["issue.updateStatus"], {
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const {
    data: issues,
    isLoading: issuesLoading,
    refetch,
  } = trpc.useQuery(["issue.getIssues"]);
  if (status === "loading") {
    return <PageLoading />;
  }

  if (user.data?.role !== "admin" || !session) {
    return <Unauthorized />;
  }

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <main className="relative bg-sky-900 h-screen text-white overflow-auto py-4">
        <Header />
        <div className="pt-16" />
        {/* Header space */}
        <div className="px-4 md:px-16 mb-8 ">
          <input
            type="text"
            placeholder="Pretrazi po autoru"
            className="rounded-md focus:outline-none focus:outline-sky-500 px-1 w-full h-10 text-blue-800 md:w-auto md:min-w-[300px]"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <div className="grid px-4 grid-cols-1 grid-rows-auto gap-y-8 md:gap-x-8 md:px-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {issuesLoading && <div>Ucitavanje problema...</div>}
          {issues &&
            !issuesLoading &&
            issues
              .filter((item) =>
                item.user.name
                  ?.toLowerCase()
                  .includes(searchFilter.toLowerCase())
              )
              .map((issue: Issue) => (
                <IssueCard
                  key={issue.id}
                  {...issue}
                  statusMutation={statusMutation}
                />
              ))}
          {issues && issues?.length <= 0 && (
            <div>Trenutno nema prijavljenih problema</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
