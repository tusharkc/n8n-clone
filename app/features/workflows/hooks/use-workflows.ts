"use client";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useWorkflowParams } from "./use-workflow-params";

export const useSuspenseWorkflows = () => {
  const [params] = useWorkflowParams();
  const [data] = trpc.workflows.getMany.useSuspenseQuery(params, {
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

export const useDeleteWorkflow = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.workflows.remove.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.name} deleted successfully`);
      utils.workflows.getMany.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
