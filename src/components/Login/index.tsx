import { signIn } from "next-auth/react";

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

export default Login;
