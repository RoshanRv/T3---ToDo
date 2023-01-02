import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const notesRouter = router({
  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  newNote: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { description, title } }) => {
      try {
        return await ctx.prisma.notes.create({
          data: { title, description },
        });
      } catch (e) {
        console.log(e);
      }
    }),
});
