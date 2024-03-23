"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} size="sm" variant="destructive" type="submit">
      Delete
    </Button>
  );
};

export default DeleteButton;