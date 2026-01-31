import { requireAuth } from "@/lib/auth-utils";

const page = async () => {
  await requireAuth();
  return <div>Hello</div>;
};

export default page;
