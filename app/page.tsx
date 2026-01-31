"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
const page = () => {
  const { data } = trpc.getWorkflows.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  const utils = trpc.useUtils();
  const create = trpc.createWorkflow.useMutation({
    onSuccess: () => utils.getWorkflows.invalidate(),
  });

  return (
    <div>
      heeerer{JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create
      </Button>
    </div>
  );
};

export default page;
