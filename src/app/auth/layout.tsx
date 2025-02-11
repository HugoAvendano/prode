
export default function ProdeLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-800 min-h-screen">
      { children }
    </main>
  );
}