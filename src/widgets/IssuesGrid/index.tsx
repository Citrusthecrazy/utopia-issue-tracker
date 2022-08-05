import { Issue, User } from "@prisma/client";
import React, { FC, useState } from "react";
import { IssueCard } from "../../components";

type IssuesGridProps = {
  issues: (Issue & { user: User })[] | undefined;
  issuesLoading: boolean;
  statusMutation: any;
};

const IssuesGrid: FC<IssuesGridProps> = ({
  issues,
  issuesLoading,
  statusMutation,
}) => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div>
      <div className="p-4 md:px-16 mb-4 ">
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
              item.user.name?.toLowerCase().includes(searchFilter.toLowerCase())
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
    </div>
  );
};

export default IssuesGrid;
