import { and, between, eq } from "drizzle-orm";
import { transactions, users } from "~/server/db/schema";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const financeRouter = createTRPCRouter({
  //   create: publicProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       await ctx.db.insert(posts).values({
  //         name: input.name,
  //       });
  //     }),
  getTransactions: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const AllTransactions = await ctx.db.query.transactions.findMany({
        where: eq(transactions.userId, input.id),
      });
      return AllTransactions;
    }),
  createTransaction: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        amount: z.number(),
        description: z.string().min(1).max(256),
        currency: z.string().min(1).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createdTransaction = await ctx.db.insert(transactions).values({
        userId: input.userId,
        amount: Math.floor((input.amount * 100) / 1),
        description: input.description,
        date: new Date(),
        currency: input.currency,
      });
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });
      if (user) {
        await ctx.db
          .update(users)
          .set({
            balance: (user.balance ?? 0) + Math.floor((input.amount * 100) / 1),
          })
          .where(eq(users.id, input.userId));
      }
      return createdTransaction;
    }),
  getByDate: publicProcedure
    .input(
      z.object({ id: z.string().min(1), since: z.date(), until: z.date() }),
    )
    .query(async ({ ctx, input }) => {
      const Transactions = await ctx.db.query.transactions.findMany({
        where: and(
          between(transactions.date, input.since, input.until),
          eq(transactions.userId, input.id),
        ),
      });
      return Transactions;
    }),
  getBalance: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const balance = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
      return (balance?.balance ?? 0) / 100;
    }),
  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),
});
