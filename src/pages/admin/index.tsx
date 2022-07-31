import { Issue } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { PageLoading, Unauthorized } from "../../components";
import { trpc } from "../../utils/trpc";
import { Header } from "../../widgets";

const Admin = () => {
  const { data: session, status } = useSession();
  const user = trpc.useQuery(["user.getUser"]);
  const statusMutation = trpc.useMutation(["issue.updateStatus"], {
    onSuccess: () => {
      refetch();
    },
  });
  const {
    data: issues,
    isLoading: issuesLoading,
    refetch,
  } = trpc.useQuery(["issue.getIssues"], {
    onSuccess: (issues) => console.log(issues),
  });
  if (status === "loading") {
    return <PageLoading />;
  }

  if (user.data?.role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <main className="relative bg-sky-900 h-screen text-white overflow-auto py-4">
      <Header />
      <div className="pt-16" />
      {/* Header space */}
      <div className="grid px-4 grid-cols-1 grid-rows-auto gap-y-8 md:gap-x-8 md:px-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {issuesLoading && <div>Ucitavanje problema...</div>}
        {issues &&
          !issuesLoading &&
          issues.map((issue: Issue) => (
            <IssueCard
              key={issue.id}
              {...issue}
              statusMutation={statusMutation}
            />
          ))}
      </div>
    </main>
  );
};

export default Admin;

const IssueCard: FC<Issue & any> = ({
  title,
  description,
  createdAt,
  id,
  statusMutation,
  user,
}) => {
  const handleUpadateStatus = () => {
    statusMutation.mutate({ id });
  };

  return (
    <div className="text-white shadow-lg rounded-lg w-full md:max-w-[330px] p-4 bg-sky-800 flex flex-col items-start">
      <span className="text-sm">
        {user.name} - {createdAt.toLocaleDateString("sr-RS")}
      </span>
      <h1 className="text-2xl">{title}</h1>
      <p className="mb-4 text-md">{description}</p>
      <div className=" flex-grow" />
      <button
        className="bg-red-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg"
        onClick={handleUpadateStatus}>
        Zatvori
      </button>
    </div>
  );
};
