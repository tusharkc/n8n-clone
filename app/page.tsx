"use client";

import { authClient } from "@/lib/auth-client";
const page = () => {
  const { data } = authClient.useSession();

  return <div>{JSON.stringify(data)}</div>;
};

export default page;
