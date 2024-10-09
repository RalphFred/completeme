import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex">
      <Sidebar />

      <section className="flex-1 bg-red-300 flex min-h-screen flex-col p-4 sm:p-14">
        
        <div className="w-full">
          {children} 
        </div> 
      </section>  
  
    </div>
  );
}
