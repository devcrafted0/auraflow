"use client";
import { Card } from "@/lib/generated/prisma/client";

interface CardItemProps {
  card: Card;
  index: number;
}

const CardItem = ({ card, index }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm cursor-pointer"
    >
      {card.title}
    </div>
  );
};

export default CardItem;
