import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: "test-workflow",
      },
    });
  }),

  getWorkflows: protectedProcedure.query((ctx) => {
    return prisma.workflow.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
