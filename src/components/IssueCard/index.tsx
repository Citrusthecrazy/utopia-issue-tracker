import { Issue } from "@prisma/client";
import { FC, useState } from "react";

const IssueCard: FC<Issue & any> = ({
  title,
  description,
  createdAt,
  id,
  statusMutation,
  user,
}) => {
  const handleUpadateStatus = () => {
    setButtonDisabled(true);
    statusMutation.mutate({ id });
  };
  const [buttonDisabled, setButtonDisabled] = useState(false);
  return (
    <div className="text-white shadow-lg rounded-lg w-full md:max-w-[330px] p-4 bg-sky-800 flex flex-col items-start">
      <span className="text-sm">
        {user.name} - {createdAt.toLocaleDateString("sr-RS")}
      </span>
      <h1 className="text-2xl">{title}</h1>
      <p className="mb-4 text-md">{description}</p>
      <div className=" flex-grow" />
      <button
        className="bg-red-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg disabled:bg-gray-500"
        onClick={handleUpadateStatus}
        disabled={buttonDisabled}>
        {buttonDisabled ? "Zatvaranje..." : "Zatvori"}
      </button>
    </div>
  );
};

export default IssueCard;
