"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl p-10 bg-white shadow-xl rounded-lg border border-gray-300">
          <h1 className="text-6xl font-extrabold mb-6 text-gray-900 text-center">
            📒 Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Your Note Manager!</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Organize your thoughts, tasks, and ideas in the most efficient way. 💡
          </p>
          <div className="flex gap-6 w-full justify-center">
            <button
              onClick={() => router.push("/notes/show")}
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-semibold py-4 px-8 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              ✏️ View Notes
            </button>
            <button
              onClick={() => router.push("/notes/create")}
              className="flex-1 bg-green-500 hover:bg-green-700 text-white text-2xl font-semibold py-4 px-8 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              ➕ Add a New Note
            </button>
          </div>
        </div>
        <footer className="text-black mt-10">
          <p className="text-lg">Take control of your day 🗓️ and never miss a note!</p>
        </footer>
      </main>
    </div>
  );
}
