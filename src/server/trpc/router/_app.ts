import { router } from "../trpc";
import { notesRouter } from "./notes";
import testRouter from "./test";

export const appRouter = router({
  test: testRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
