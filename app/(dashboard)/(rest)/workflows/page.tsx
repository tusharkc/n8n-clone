import WorkflowsList, {
  WorkflowContainer,
} from "@/app/features/workflows/components/workflows";
import { workflowParamsLoader } from "@/app/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/app/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Prop = {
  searchParams: Promise<SearchParams>;
};

const page = async ({ searchParams }: Prop) => {
  await requireAuth();

  const params = await workflowParamsLoader(searchParams);
  await prefetchWorkflows(params);

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default page;
