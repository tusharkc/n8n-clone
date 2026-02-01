import { useQueryStates } from "nuqs";
import { workflowParams } from "../params";

export const useWorkflowParams = () => {
  const params = useQueryStates(workflowParams);

  return params;
};
