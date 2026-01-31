import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  await requireAuth();

  const { credentialId } = await params;
  return <div>Credential {credentialId}</div>;
};

export default page;
