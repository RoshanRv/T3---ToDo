import { number, z } from "zod";
import { publicProcedure, router } from "../trpc";

export const notesRouter = router({
  //         get Single Unique Note
  getNoteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.notes.findUnique({
        where: {
          id,
        },
      });
    }),

  //              get All Notes
  getAllNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  //              create new Note
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

  //              update note
  updateNote: publicProcedure
    .input(
      z.object({ title: z.string(), description: z.string(), id: z.number() })
    )
    .mutation(async ({ ctx, input: { description, title, id } }) => {
      try {
        return await ctx.prisma.notes.update({
          where: { id },
          data: {
            title,
            description,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),

  //  delete Note

  deleteNote: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.notes.delete({
          where: {
            id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),
});
