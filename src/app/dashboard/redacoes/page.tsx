"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createRedactionUseCase } from "@/domain/redaction/correction-redaction";

export default function Page() {
  const [redaction, setRedaction] = useState("");
  
  const createRedaction = useMutation({
    mutationFn: createRedactionUseCase,
    onSuccess: () => {
      setRedaction("");
    },
  });

  const handleClick = () => {
    if (!redaction) return; 
    createRedaction.mutate(redaction);
  };

  return (
    <div className="flex flex-col items-center p-8 gap-4 h-full">
      <Textarea
        placeholder="Escreva sua redação aqui"
        className="flex-1 w-full text-white"
        value={redaction}
        onChange={(e) => setRedaction(e.target.value)}
      />
      <Button
        variant="secondary"
        className="w-full mb-1"
        onClick={handleClick}
        disabled={createRedaction.isPending}
      >
        {createRedaction.isPending ? "Enviando..." : "Enviar"}
      </Button>
    </div>
  );
}
