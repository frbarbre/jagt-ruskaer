"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { deleteMessage } from "../../actions/message.actions";
import { useServerAction } from "@/hooks/useServerAction";

export default function Delete({ message }) {
  const [runDeleteAction, isDeleteRunning] = useServerAction(deleteMessage);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="px-2.5"
            variant="outline"
            onClick={() => runDeleteAction({ message: message })}
          >
            {isDeleteRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Slet besked</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
