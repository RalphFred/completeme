import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen dark:bg-blue-1 bg-blue-4">
      <div className="flex-between wrapper">
        <div className="text-3xl font-semibold">
          CompleteME 🥺
        </div>
        <div className="flex gap-8 text-lg">
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">Sign Up</Link>
          <UserButton />
        </div>
      </div>
    </div>
  );
}
