import { auth } from "~/server/auth";
import SignIn from "./_components/sign-in";
import { Transaction } from "./_components/transactions";
import { api } from "~/trpc/server";
export default async function Home() {
  const session = await auth();
  if (!session?.user.id) return <p>Err</p>;
  const data = await api.finance.getTransactions({
    id: session.user.id,
  });

  // const { greeting } = await api.finance.hello({
  //   text: "world",
  // });
  // if (isLoading) return <div>Loading...</div>;
  return (
    <main className="items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Finance manager</h1>
      {!session && <SignIn />}
      {session && <span>Logged in as {session.user?.name}</span>}
      {session && <Transaction id="jakies id" />}
      {/* {greeting} */}
      {data?.map((t) => {
        return (
          <div key={t.id}>
            <h1>Transaction {t.id}</h1>
            <p>{t.amount}</p>
            <p>{t.description}</p>
          </div>
        );
      })}
    </main>
  );
}
