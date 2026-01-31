import { requireAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireAuth();

  return <div>Executions</div>;
};

export default page;
