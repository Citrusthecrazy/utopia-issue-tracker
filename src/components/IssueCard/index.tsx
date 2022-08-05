import { Issue } from "@prisma/client";
import Image from "next/image";
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
    <div className="relative text-white shadow-lg rounded-lg w-full md:max-w-[330px] p-4 pt-6 bg-sky-800 flex flex-col items-start">
      <div className="absolute left-[16px] top-[-25px] overflow-none flex flex-row items-center gap-2 pr-2 bg-sky-700 shadow-md rounded-l-full rounded-r-full">
        <Image
          src={user.image}
          width={50}
          height={50}
          className="rounded-full"
        />
        <span className="font-semibold  px-2 py-1 rounded-lg">{user.name}</span>
      </div>
      <span className="absolute top-[-15px] right-[25px] text-sm bg-sky-700 shadow-md px-2 py-1 rounded-full">
        {createdAt.toLocaleDateString("sr-RS")}
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
