import { Board } from "@/lib/generated/prisma/client";
import BoardTitleForm from "./board-title-form";

interface BoardNavbarProps {
  board: Board;
}

const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="fixed top-14 h-14 w-full flex items-center gap-x-4 text-white bg-black/25 px-6 z-40">
      <BoardTitleForm board={board} />
    </div>
  );
};

export default BoardNavbar;
