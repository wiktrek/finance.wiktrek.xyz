import { auth } from "~/server/auth";
import SignIn from "~/app/_components/sign-in";
import { Transaction } from "~/app/_components/transactions";
import { api } from "~/trpc/server";
import { Chart, ChartWithSelectMenu } from "~/components/chart";
export default async function Home() {
  const session = await auth();
  if (!session?.user.id)
    return (
      <>
        Err <SignIn />
      </>
    );
  const data = await api.finance.getByDate({
    id: session.user.id,
    since: new Date("2024-12-20"),
    until: new Date("2025-03-02"),
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
      <ChartWithSelectMenu id={session.user.id} />
    </main>
  );
}
