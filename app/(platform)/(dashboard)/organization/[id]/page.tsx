import { db } from "@/lib/db";
import Board from "./_components/Board";
import Form from "./_components/Form";

const Page = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-3">
      <Form />
      <div>
        {boards.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
};

export default Page;
