import AppHeader from "@/components/app-header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex-1">
        <AppHeader />
        {children}
      </main>
    </>
  );
};

export default layout;
