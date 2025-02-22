import { auth } from "~/server/auth";
import SignIn from "~/app/_components/sign-in";
import { Transaction } from "~/app/_components/transactions";
import { api } from "~/trpc/server";
export default async function Home() {
  const session = await auth();
  if (!session?.user.id) return <p>Err</p>;
  if (!session) return <SignIn />;
  const data = await api.finance.getTransactions({
    id: session.user.id,
  });
  return (
    <main className="items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Spending summary</h1>
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
    </main>
  );
}
