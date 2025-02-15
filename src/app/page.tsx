import { auth } from "~/server/auth";
import SignIn from "./_components/sign-in";
export default async function Home() {
  const session = await auth();

  return (
    <main className="items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Finance manager</h1>
      <SignIn />
      {session && <span>Logged in as {session.user?.name}</span>}
    </main>
  );
}
