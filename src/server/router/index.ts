// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./issue";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("issue.", exampleRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
