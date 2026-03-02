import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import BoardNavbar from "../_components/board-navbar";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { orgId } = await auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const { orgId } = await auth();
  const { id } = await params;

  if (!id || !orgId) {
    return redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/30" />
      <main className="relative pt-28 h-full">{children}</main>;
    </div>
  );
};

export default BoardIdLayout;
