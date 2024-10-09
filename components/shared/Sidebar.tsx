import { SidebarLinks } from "@/constants";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar bg-blue-5 h-screen">
      <div className="flex-1 flex flex-col gap-8">
        <div className="text-3xl font-semibold">CompleteME 😡</div>
        <div className="flex flex-col gap-8 text-lg">
          {SidebarLinks.map((link) => (
            <Link
              href={link.url}
              key={link.name}
              className="flex items-center gap-2"
            >
              <Image src={link.imgSrc} alt={link.name} width={24} height={24} />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <SignOutButton redirectUrl="/">
          <div className="flex items-center text-lg gap-2">
            <Image
              src="/images/logout.svg"
              alt="logout"
              width={32}
              height={32}
            />
            <span>Logout</span>
          </div>
        </SignOutButton>
      </div>
    </div>
  );
}
