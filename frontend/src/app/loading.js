import { Loader } from "lucide-react"


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin h-24 w-24 mb-4">
        <Loader className="h-full w-full text-yellow-500 dark:text-yellow-300" />

      </div>
      <h1 className="text-4xl font-bold">Word Mentor</h1>
      <p className="mt-2 text-lg animate-pulse">Loading...</p>
    </div>
  )
}


