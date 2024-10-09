import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <Sidebar />

      <section className="flex-1 flex min-h-screen flex-col p-4 sm:p-14">
        <div className="w-full">
          {children} 
        </div> 
      </section>  
  
    </div>
  );
}
