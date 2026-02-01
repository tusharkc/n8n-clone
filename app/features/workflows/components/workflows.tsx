"use client";
import EntityHeader, { EntityContainer } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";

const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows();
  return (
    <div className="flex flex-col gap-y-4">
      {JSON.stringify(workflows, null, 2)}
    </div>
  );
};

export default WorkflowsList;

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        disabled={disabled}
        title="Workflows"
        description="Manage your workflows"
        newButtonLabel="New Workflow"
        onNew={handleCreate}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <EntityContainer
        header={<WorkflowsHeader />}
        search={<></>}
        pagination={<></>}
      >
        {children}
      </EntityContainer>
    </>
  );
};
