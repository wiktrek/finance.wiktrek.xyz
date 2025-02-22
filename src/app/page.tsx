import { auth } from "~/server/auth";
import SignIn from "./_components/sign-in";
import { CreateTransaction, Transaction } from "./_components/transactions";
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
      {/* {greeting} */}
      {data?.map((t) => {
        return (
          <Transaction
            key={t.id}
            amount={t.amount}
            currency={t.currency}
            description={t.description ?? ""}
            id={t.id}
          />
        );
      })}
      <CreateTransaction />
    </main>
  );
}
