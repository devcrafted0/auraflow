import { deleteBoard } from "@/actions/delete-Board";
import { Button } from "@/components/ui/button";

interface BoardProps {
  id: string;
  title: string;
}

const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>{title}</p>
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
};

export default Board;
