"use client";
import EntityHeader, {
  EntityContainer,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows();
  return (
    <div className="flex flex-col gap-y-4">
      {JSON.stringify(workflows, null, 2)}
    </div>
  );
};

export const WorkflowPagination = () => {
  const { data } = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowParams();

  return (
    <EntityPagination
      page={data.page}
      totalPages={data.totalPages}
      onPageChange={(page) => setParams({ page })}
    />
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
        search={<WorkflowSearch />}
        pagination={<WorkflowPagination />}
      >
        {children}
      </EntityContainer>
    </>
  );
};
