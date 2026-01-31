import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-4">
      <div className="flex flex-col items-center gap-8">
        <Image src={"/logos/logo.svg"} alt="Logo" width={100} height={100} />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
