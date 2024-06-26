"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";

interface CardItemProps {
  index: number;
  card: Card;
}

const CardItem = ({ index, card }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
