"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { likeMessage } from "../../actions/message.actions";
import { useServerAction } from "@/hooks/useServerAction";

export default function Like({ message, currentUser, data }) {
  const [runLikeAction, isLikeRunning] = useServerAction(likeMessage);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`px-2.5 ${data.length > 0 && "group"}`}
            variant="outline"
            onClick={() =>
              runLikeAction({ currentUser: currentUser, message: message })
            }
            disabled={isLikeRunning}
          >
            {isLikeRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <Check className="w-4 h-4 group-hover:hidden" />
                    <EyeOff className="w-4 h-4 hidden group-hover:block" />
                  </>
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {data.length > 0 ? <p>Marker som ulæst</p> : <p>Marker som læst</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
