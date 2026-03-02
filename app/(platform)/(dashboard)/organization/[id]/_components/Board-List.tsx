import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BoardList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Dynamic Boards from db */}
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full h-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        {/* Default adding the board box that can also open popover */}
        <FormPopover side="right" sideOffset={10}>
          <div className="aspect-video relative h-full w-full bg-muted rounded-b-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces can have upto 5 open boards. For unlimited boards upgrade this workspace.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-3.5 w-3.5" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
      <Skeleton className="w-full h-full p-2 aspect-video" />
    </div>
  );
};
