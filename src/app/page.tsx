import { auth } from "~/server/auth";
import SignIn from "./_components/sign-in";
import { CreateTransaction } from "./_components/transactions";
import { api } from "~/trpc/server";
export default async function Home() {
  const session = await auth();
  if (!session?.user.id)
    return (
      <>
        Err <SignIn />
      </>
    );
  const data = await api.finance.getBalance({
    id: session.user.id,
  });
  return (
    <main className="items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Finance manager</h1>
      {!session && <SignIn />}
      {data && <p>Balance: {data}</p>}
      <CreateTransaction />
      <div className="sticky bottom-0">
        <p className="text-center">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
      </div>
    </main>
  );
}
