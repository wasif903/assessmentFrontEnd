"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="p-4 rounded-2xl shadow-2xl bg-white border border-blue-600 flex flex-col gap-4 w-[20rem] max-sm:w-[90%] items-center justify-center">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <button
          className="bg-blue-600 rounded-2xl cursor-pointer text-white text-base font-medium px-4 py-2 w-32"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="bg-blue-600 rounded-2xl cursor-pointer text-white text-base font-medium px-4 py-2 w-32"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
