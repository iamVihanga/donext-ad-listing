import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg p-0 overflow-hidden">
        <CardHeader className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-3xl font-bold">Your Tasks</CardTitle>
          <CardDescription className="text-white/80">
            Manage and organize your daily tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pending Tasks Card Skeleton */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Pending Tasks</CardTitle>
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 rounded-md border p-3"
                      >
                        <Skeleton className="h-4 w-4 rounded-sm" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Completed Tasks Card Skeleton */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Completed Tasks</CardTitle>
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 rounded-md border p-3"
                      >
                        <Skeleton className="h-4 w-4 rounded-sm" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-between">
            <Skeleton className="h-4 w-56" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
