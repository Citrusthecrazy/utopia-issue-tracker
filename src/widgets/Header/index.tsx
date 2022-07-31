import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
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
      <Image
        src={image}
        className="rounded-full"
        height={48}
        width={48}
        alt={`${username}'s profile picture`}
      />
      <span className="font-semibold text-lg ml-4">
        Prijavljeni ste kao {username}
      </span>
    </div>
  );
};
