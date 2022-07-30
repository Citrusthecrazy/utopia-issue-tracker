import { useSession, signOut } from "next-auth/react";
import React, { FC } from "react";

type UserInfoType = {
  username: string;
  image: string;
};

const Header = () => {
  const { data: session, status } = useSession();

  if (!session) return null;

  return (
    <div className="absolute top-0 left-0 right-0 h-16 shadow-sm bg-sky-800 flex flex-row items-center justify-between px-2">
      {session?.user?.name && session?.user?.image && (
        <UserInfo username={session.user.name} image={session.user?.image} />
      )}
      <button
        className="bg-red-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg"
        onClick={() => signOut()}>
        Odjavite se
      </button>
    </div>
  );
};

export default Header;

const UserInfo: FC<UserInfoType> = ({ username, image }) => {
  return (
    <div className="flex flex-row items-center">
      <img src={image} className="w-12 rounded-full mr-4" />
      <span className="font-semibold text-lg">
        Prijavljeni ste kao {username}
      </span>
    </div>
  );
};
