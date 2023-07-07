import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

// server side function

export default function Home() {
  const { isLoading, error, user } = useUser();

  // check if is loading / error
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <Head>
        <title>Chatty Pete - Login or Signup</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 text-center text-white">
        <div>
          {!!user && <Link href="/api/auth/logout">Logout</Link>}
          {!user && (
            <>
              <Link
                href="/api/auth/login"
                className="btn"
              >
                Login
              </Link>
              <Link
                href="/api/auth/signup"
                className="btn"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// export server side function here
export const getServerSideProps = async (ctx) => {
  // check if there is a current user session
  const session = await getSession(ctx.req, ctx.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }

  // if there is no session
  return {
    props: {},
  };
};
