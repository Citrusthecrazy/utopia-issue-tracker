import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const userRouter = createRouter().query("getUser", {
  async resolve({ ctx, input }) {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
    if (!user) {
      throw new trpc.TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    } else return user;
  },
});
