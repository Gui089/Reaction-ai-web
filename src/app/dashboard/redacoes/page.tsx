"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createRedactionUseCase } from "@/domain/redaction/correction-redaction";
import { RedactionCorrection } from "@/components/templates/redaction-correction";

export default function Page() {
  const [redaction, setRedaction] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [noteRedaction, setNoteRedaction] = useState<number>(0);
  const [notePerGroup, setNotePerGroup] = useState([]);

  const createRedaction = useMutation({
    mutationFn: createRedactionUseCase,
    onSuccess: (data) => {
      setFeedback(data.feedback.feedback);
      setNoteRedaction(data.feedback.nota);
      setNotePerGroup(data.feedback.notaporcomp);
      setRedaction("");
    },
  });

  const handleClick = () => {
    if (!redaction) return;
    createRedaction.mutate(redaction);
  };

  return (
    <div className="flex flex-col items-center p-8 gap-4 h-full">
      {!createRedaction.isSuccess ? (
        <>
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
        </>
      ) : (
        <RedactionCorrection  redaction={feedback} note={noteRedaction} notaPorComp={notePerGroup}/>
      )}
    </div>
  );
}
