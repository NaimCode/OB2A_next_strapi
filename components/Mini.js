import Head from "next/head";
import Link from "next/link";
export const MyHead = () => {
  return (
    <Head>
      <title>O'B2A</title>
      <meta
        name="description"
        content="Faisons le tour du monde sur un panda"
      />
      <link rel="icon" href="/assets/logo_mini_blue.png" />
    </Head>
  );
};
export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <a>
          <span className="font-logo text-3xl text-transparent bg-clip-text bg-gradient-to-br from-primary-100 to-blue-600 font-black">
            O'B2A
          </span>
        </a>
      </Link>
    </div>
  );
};

export const SearchBar = () => {
  return;
};
