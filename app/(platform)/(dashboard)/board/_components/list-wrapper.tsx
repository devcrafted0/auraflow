import { ReactNode } from "react";

interface ListWrapperProps {
  children: ReactNode;
}

const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="shrink-0 h-full w-68 select-none">{children}</li>;
};

export default ListWrapper;
