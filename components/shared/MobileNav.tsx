"use client";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { SidebarLinks } from "@/constants";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function MobileNav() {
  return (
    <Sheet>
      <div className="wrapper lg:hidden flex items-center justify-between bg-blue-5 dark:bg-blue-1">
        <div className="text-2xl sm:text-3xl font-semibold">CompleteME 😡</div>

        <SheetTrigger>
          <Image src="/images/burger.svg" alt="menu" width={32} height={32} />
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="h-screen bg-blue-5 dark:bg-blue-1">
        <div className="flex flex-col justify-between h-full py-4">
          <div className="flex flex-col gap-6">
            <div className="text-3xl font-semibold">CompleteME 😡</div>
            <div className="flex flex-col gap-10 text-lg">
              {SidebarLinks.map((link) => (
                <SheetClose>
                  <Link
                    href={link.url}
                    key={link.name}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={link.imgSrc}
                      alt={link.name}
                      width={24}
                      height={24}
                    />
                    <span>{link.name}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>

          <div>
            <SheetClose>
              <SignOutButton redirectUrl="/">
                <div className="flex items-center text-lg gap-2 cursor-pointer">
                  <Image
                    src="/images/logout.svg"
                    alt="logout"
                    width={32}
                    height={32}
                  />
                  <span>Logout</span>
                </div>
              </SignOutButton>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
