import { and, between, eq } from "drizzle-orm";
import { transactions } from "~/server/db/schema";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cursorTo } from "readline";

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
        amount: input.amount,
        description: input.description,
        date: new Date(),
        currency: input.currency,
      });
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
  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),
});
