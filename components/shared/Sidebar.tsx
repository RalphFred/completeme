import { SidebarLinks } from "@/constants";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar bg-blue-5 h-screen">
      <div className="flex flex-col gap-8">
      <div className="text-3xl font-semibold">
        CompleteME 🥺
      </div>
      <div className="flex flex-col gap-8 text-lg">
        {
          SidebarLinks.map((link) => (
            <Link href={link.url} key={link.name}> {link.name}</Link>
          ))
        }
      </div>
      </div>
    </div>
  )
};
