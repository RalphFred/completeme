import MobileNav from "@/components/shared/MobileNav";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="relative flex duration-200">
      <Sidebar />

      <section className="flex-1 bg-white dark:bg-slate-700 flex min-h-screen flex-col">
        <Navbar />
        <MobileNav />
        <div className="w-full">
          {children} 
        </div> 
      </section>  
  
    </div>
  );
}
