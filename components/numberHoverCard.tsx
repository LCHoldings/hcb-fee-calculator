import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { InfoIcon } from "lucide-react";

export default function NumberHoverCard(
  { 
    labels, 
    value,
  }: 
  { 
    labels: {
      title: string,
      description: string
    }, 
    value: (number | string), 
  }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span>{labels.title}: {value}</span>
          <InfoIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 bg-white dark:bg-card rounded-lg">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{labels.title}</h4>
            <p className="text-sm">{labels.description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}