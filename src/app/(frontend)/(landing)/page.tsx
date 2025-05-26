// import { client } from "@/lib/rpc";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface Task {
//   id: string;
//   name: string;
//   done: boolean;
// }

export default async function Home() {
  // const tasksRes = await client.api.tasks.$get();
  // const data: Task[] = await tasksRes.json();

  // // Group tasks by completion status
  // const completedTasks = data.filter((task) => task.done);
  // const pendingTasks = data.filter((task) => !task.done);

  return (
    <div></div>
    // <div className="container mx-auto py-8">
    //   <Card className="shadow-lg p-0 overflow-hidden">
    //     <CardHeader className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    //       <CardTitle className="text-3xl font-bold">Your Tasks</CardTitle>
    //       <CardDescription className="text-white/80">
    //         Manage and organize your daily tasks
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent className="p-6">
    //       <div className="grid gap-6 md:grid-cols-2">
    //         {/* Pending Tasks Card */}
    //         <Card>
    //           <CardHeader className="pb-3">
    //             <div className="flex items-center justify-between">
    //               <CardTitle className="text-xl">Pending Tasks</CardTitle>
    //               <Badge
    //                 variant="outline"
    //                 className="bg-amber-100 text-amber-700"
    //               >
    //                 {pendingTasks.length}
    //               </Badge>
    //             </div>
    //           </CardHeader>
    //           <CardContent>
    //             <ScrollArea className="h-[300px] pr-4">
    //               <div className="space-y-2">
    //                 {pendingTasks.map((task) => (
    //                   <div
    //                     key={task.id}
    //                     className="flex items-center space-x-4 rounded-md border p-3 transition-all hover:bg-muted/50"
    //                   >
    //                     <Checkbox id={`task-${task.id}`} checked={task.done} />
    //                     <div className="flex-1">
    //                       <label
    //                         htmlFor={`task-${task.id}`}
    //                         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                       >
    //                         {task.name || "(Unnamed task)"}
    //                       </label>
    //                     </div>
    //                   </div>
    //                 ))}
    //                 {pendingTasks.length === 0 && (
    //                   <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
    //                     No pending tasks. Great job! 🎉
    //                   </div>
    //                 )}
    //               </div>
    //             </ScrollArea>
    //           </CardContent>
    //         </Card>

    //         {/* Completed Tasks Card */}
    //         <Card>
    //           <CardHeader className="pb-3">
    //             <div className="flex items-center justify-between">
    //               <CardTitle className="text-xl">Completed Tasks</CardTitle>
    //               <Badge
    //                 variant="outline"
    //                 className="bg-green-100 text-green-700"
    //               >
    //                 {completedTasks.length}
    //               </Badge>
    //             </div>
    //           </CardHeader>
    //           <CardContent>
    //             <ScrollArea className="h-[300px] pr-4">
    //               <div className="space-y-2">
    //                 {completedTasks.map((task) => (
    //                   <div
    //                     key={task.id}
    //                     className="flex items-center space-x-4 rounded-md border p-3 transition-all hover:bg-muted/50"
    //                   >
    //                     <Checkbox id={`task-${task.id}`} checked={task.done} />
    //                     <div className="flex-1">
    //                       <label
    //                         htmlFor={`task-${task.id}`}
    //                         className="text-sm font-medium leading-none line-through text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                       >
    //                         {task.name || "(Unnamed task)"}
    //                       </label>
    //                     </div>
    //                   </div>
    //                 ))}
    //                 {completedTasks.length === 0 && (
    //                   <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
    //                     No completed tasks yet.
    //                   </div>
    //                 )}
    //               </div>
    //             </ScrollArea>
    //           </CardContent>
    //         </Card>
    //       </div>

    //       <div className="mt-6 flex justify-between">
    //         <p className="text-sm text-muted-foreground">
    //           Showing {data.length} tasks ({completedTasks.length} completed,{" "}
    //           {pendingTasks.length} pending)
    //         </p>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
