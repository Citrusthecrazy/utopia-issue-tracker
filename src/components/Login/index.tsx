import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <p className="text-[2.5rem] mb-8">Niste prijavljeni</p>
      <button
        className="text-[1rem] sm:text-[2rem] bg-sky-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg disabled:bg-gray-500 w-1/2 sm:w-auto"
        onClick={() => signIn()}
        disabled={status === "loading"}>
        {status === "loading"
          ? "Ucitavanje..."
          : "Prijavite se putem Discord-a"}
      </button>
    </>
  );
};

export default Login;
