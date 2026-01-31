import { requireUnAuth } from "@/lib/auth-utils";
import AuthLayout from "../features/auth/components/auth-layout";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await requireUnAuth();
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
