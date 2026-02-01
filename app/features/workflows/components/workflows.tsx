"use client";
import { Workflow } from "@/app/generated/prisma/client";
import EntityHeader, {
  EmptyView,
  EntityContainer,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import {
  useCreateWorkflow,
  useDeleteWorkflow,
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
    <EntityList
      items={workflows.items}
      emptyView={<WorkflowsEmpty />}
      getKey={(item) => item.id}
      renderItem={(item) => <WorkflowItem item={item} />}
    />
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

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />;
};

export const WorkflowsEmpty = () => {
  const router = useRouter();
  const { handleError } = useUpgradeModal();

  const createWorkflow = useCreateWorkflow();

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
  return <EmptyView message="No workflows found..." onNew={handleCreate} />;
};

export const WorkflowItem = ({ item }: { item: Workflow }) => {
  const deleteWorkflow = useDeleteWorkflow();

  return (
    <EntityItem
      href={`/workflows/${item.id}`}
      title={item.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(item.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(item.createdAt, { addSuffix: true })}
        </>
      }
      onRemove={() => deleteWorkflow.mutate({ id: item.id })}
      isRemoving={deleteWorkflow.isPending}
      image={
        <div className="size-8 flex items-center justify-center rounded-md bg-primary/10 text-primary">
          <WorkflowIcon />
        </div>
      }
    />
  );
};
