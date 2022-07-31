import Link from "next/link";

const PageLoading = () => {
  return (
    <div className="bg-sky-900 h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl">Ucitavanje...</h1>
      <Link href="/" className="text-red-500">
        Nazad na pocetnu
      </Link>
    </div>
  );
};

export default PageLoading;
