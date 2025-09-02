import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface NotaPorComp {
  [key: number]: string;
  feedaback: string;
}

interface RedactionCorrectionProps {
  redaction: string;
  note: number;
  notaPorComp: NotaPorComp[];
}

export function RedactionCorrection({ redaction, note, notaPorComp }: RedactionCorrectionProps) {
  return (
    <div className="bg-black p-6 rounded-2xl shadow-lg space-y-6">
      <h1 className="text-green-600 text-2xl font-bold">
        Sua nota foi de: {note}
      </h1>

      <h2 className="text-white text-lg font-semibold">
        Feedback geral:
      </h2>
      <p className="text-gray-300">{redaction}</p>

      <Accordion type="single" collapsible className="w-full mt-4">
        {notaPorComp.map((comp, index) => {
          const compNumber = index + 1
          const nota = comp[compNumber as keyof typeof comp]
          return (
            <AccordionItem key={index} value={`item-${compNumber}`}>
              <AccordionTrigger>
                Competência {compNumber} - Nota {nota}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-gray-300">
                <p>{comp.feedaback}</p>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
