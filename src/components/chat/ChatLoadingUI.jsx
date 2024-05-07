/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dNp3J5mazVy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function ChatLoadingUI() {
  return (
    <div className="flex h-[100dvh] w-full flex-col">
      <header className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="grid gap-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="max-w-[75%] space-y-1.5 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-end">
            <div className="max-w-[75%] space-y-1.5 rounded-lg bg-blue-500 p-3 text-sm text-white">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="max-w-[75%] space-y-1.5 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-end">
            <div className="max-w-[75%] space-y-1.5 rounded-lg bg-blue-500 p-3 text-sm text-white">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Button disabled variant="primary">
            <Skeleton className="h-5 w-16" />
          </Button>
        </div>
      </div>
    </div>
  )
}