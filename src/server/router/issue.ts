import { Context, createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { PrismaClient } from "@prisma/client";

export const issueRouter = createRouter()
  .mutation("createIssue", {
    input: z.object({
      issueTitle: z.string(),
      issueDescription: z.string(),
    }),
    async resolve({ ctx, input }) {
      const lastIssueDate = await getLastIssueDate(ctx.prisma);

      let daysSinceLastIssue = 0;

      if (lastIssueDate) {
        const today = new Date();
        daysSinceLastIssue = subtractDates(today, lastIssueDate.createdAt);
      }
      if (daysSinceLastIssue > 1 || !lastIssueDate) {
        await createNewIssue(ctx, input);
      } else {
        throw new trpc.TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Mozete da posaljete samo jedan problem po danu",
        });
      }
    },
  })
  .query("getIssues", {
    async resolve({ ctx, input }) {
      const issues = await ctx.prisma.issue.findMany({
        where: {
          status: "open",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      if (!issues)
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Nema nijednog problema",
        });

      return issues;
    },
  })
  .mutation("updateStatus", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const issue = await ctx.prisma.issue.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!issue)
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Problem ne postoji",
        });
      if (issue.status === "open") {
        await ctx.prisma.issue.update({
          where: {
            id: input.id,
          },
          data: {
            status: "closed",
          },
        });
      } else {
        throw new trpc.TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Problem je vec zatvoren",
        });
      }
    },
  });

function subtractDates(date1: Date, date2: Date) {
  const diff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}

const getLastIssueDate = async (prisma: PrismaClient) => {
  return await prisma.issue.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
};

const createNewIssue = async (
  ctx: Context,
  input: {
    issueTitle: string;
    issueDescription: string;
  }
) => {
  if (ctx?.session?.user?.id === undefined) return;
  return await ctx.prisma.issue.create({
    data: {
      title: input.issueTitle,
      description: input.issueDescription,
      authorId: ctx.session?.user?.id,
    },
  });
};
