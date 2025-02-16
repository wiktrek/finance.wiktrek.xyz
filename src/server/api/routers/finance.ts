import { eq } from "drizzle-orm";
import { transactions } from "~/server/db/schema";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const financeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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
  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),
});
