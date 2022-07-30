import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";

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

export default QuestionForm;
