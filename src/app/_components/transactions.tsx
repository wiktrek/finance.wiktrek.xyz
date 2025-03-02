"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export function Transaction(props: {
  id: string;
  amount: number;
  description: string;
  currency: string;
}) {
  return (
    <div className="w-64 text-left">
      <p>{`${props.description} - ${props.amount / 100}${props.currency}`}</p>
    </div>
  );
}
export function CreateTransaction() {
  // move this to react-hook-form
  const { data: session, status } = useSession();
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [currency, setCurrency] = React.useState("PLN");
  const [createdTransaction, setCreatedTransaction] = React.useState(false);
  const mutation = api.finance.createTransaction.useMutation();
  if (!session || status !== "authenticated") return <p>Not logged in!</p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = mutation.mutate(
      {
        amount: parseFloat(amount),
        description,
        currency,
        userId: session?.user?.id,
      },
      {
        onSuccess: () => {
          setCreatedTransaction(true);
        },
      },
    );
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <Input
        className="w-48"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <Input
        className="w-48"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Select onValueChange={(e) => setCurrency(e)} defaultValue="PLN">
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          {["PLN", "EUR", "USD"].map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Create transaction</Button>
      {createdTransaction && <p>Transaction created</p>}
    </form>
  );
}
