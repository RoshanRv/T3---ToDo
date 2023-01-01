import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const testRouter = router({
  test: publicProcedure
    .input(z.object({ msg: z.string() }))
    .query(({ input }) => {
      return { msg: `Test succeeded.... ${input.msg}` };
    }),
});

export default testRouter;
