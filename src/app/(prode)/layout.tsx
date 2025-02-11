import { TopMenu, Sidebar } from "@/components/ui";

export default function ProdeLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className=" min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className=" md:px-10">
        {children}
      </div>
    </main>
  );
}