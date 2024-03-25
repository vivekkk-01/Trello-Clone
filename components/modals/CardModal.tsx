"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import Header from "./Header";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header card={cardData} />}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;