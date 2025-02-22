"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
export function Transaction(props: {
  id: string;
  amount: number;
  description: string;
  currency: string;
}) {
  return (
    <div className="w-64 text-left">
      <p>{`${props.description} - ${props.amount}${props.currency}`}</p>
    </div>
  );
}
export function CreateTransaction() {
  // move this to react-hook-form
  const { data: session, status } = useSession();
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [currency, setCurrency] = React.useState("");
  const [createdTransaction, setCreatedTransaction] = React.useState(false);
  const mutation = api.finance.createTransaction.useMutation();
  if (!session || status !== "authenticated") return <p>Not logged in!</p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = mutation.mutate({
      amount: parseFloat(amount),
      description,
      currency,
      userId: session?.user?.id,
    });
    console.log(data);
    setCreatedTransaction(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        placeholder="Currency"
      />
      <button type="submit">Create transaction</button>
      {createdTransaction && <p>Transaction created</p>}
    </form>
  );
}
