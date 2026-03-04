import { ListWithCards } from "@/types";
import ListForm from "./list-form";

type ListContainerProps = {
  boardId: string;
  data: ListWithCards[];
};

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
