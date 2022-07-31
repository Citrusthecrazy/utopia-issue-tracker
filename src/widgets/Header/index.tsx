import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { trpc } from "../../utils/trpc";

type HeaderUserInfoType = {
  username: string;
  image: string;
};

const Header = () => {
  const { data: session, status } = useSession();
  if (!session) return null;

  const user = trpc.useQuery(["user.getUser"]);

  return (
    <div className="absolute top-0 left-0 right-0 h-16 shadow-sm bg-sky-800 flex flex-row items-center justify-between px-16 text-white">
      {session?.user?.name && session?.user?.image && (
        <HeaderUserInfo
          username={session.user.name}
          image={session.user?.image}
        />
      )}
      <div>
        {user.data?.role === "admin" && (
          <Link href="/admin" onClick={() => signOut()}>
            Admin panel
          </Link>
        )}
        <button
          className="bg-red-700 px-4 py-2 rounded-md shadow-md focus:shadow-xl hover:shadow-lg ml-4"
          onClick={() => signOut()}>
          Odjavite se
        </button>
      </div>
    </div>
  );
};

export default Header;

const HeaderUserInfo: FC<HeaderUserInfoType> = ({ username, image }) => {
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
