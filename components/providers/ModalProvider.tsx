"use client";

import React, { useEffect, useState } from "react";
import CardModal from "../modals/CardModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
    </>
  );
};

export default ModalProvider;
