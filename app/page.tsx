import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen dark:bg-blue-1 bg-blue-4 flex flex-col">
      <div className="flex-between wrapper">
        <div className="text-3xl font-semibold">CompleteME 😡</div>
        <div className="flex gap-8 text-lg">
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">Sign Up</Link>
          <UserButton />
        </div>
      </div>

      {/* Hero */}
      <div className=" flex-1 dark:bg-blue-1 bg-blue-4 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-6 dark:text-blue-100">
            Stay Productive with <span className="text-blue-2">CompleteMe</span>
          </h1>
          <p className="text-lg dark:text-gray-300 mb-8">
            Your personal task manager designed to help you track daily goals,
            boost productivity, and celebrate achievements. Stay organized and
            motivated every step of the way!
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/sign-up"
              className="px-6 py-3 text-lg font-semibold bg-blue-2 text-white rounded-lg hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              href="/features"
              className="px-6 py-3 text-lg font-semibold border-2 border-blue-2 text-blue-2 rounded-lg hover:bg-blue-100"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
