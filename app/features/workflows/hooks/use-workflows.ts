"use client";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const [data] = trpc.workflows.getMany.useSuspenseQuery(undefined, {
    refetchOnMount: false,
  });
  return { data };
};

export const useCreateWorkflow = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.workflows.create.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.name} created successfully`);
      utils.workflows.getMany.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
