import Layout from '../components/layout'
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
export default function Page () {



  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      <button onClick = {() => signIn()}>X</button>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    // If no user, redirect to login

    return {
      props: {},
      redirect: {
        destination: `/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}`,
        permanent: false,
      },
    };
  }

  // If there is a user, return the current session
  return { props: { session } };
}
