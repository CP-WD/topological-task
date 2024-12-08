"use client";

import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Collapsible } from "~/components/ui/collapsible";
import { Task } from "~/types/Task";

export const TaskTreeNode = ({
  item: task,
  hasChild,
  children
}: PropsWithChildren<{ item: Task; hasChild: boolean }>) => {
  return (
    <Collapsible>
      <div className="flex align-items-center">
        {hasChild && (
          <CollapsibleTrigger className="data-[state=open]:rotate-90 transition">
            <ChevronRight />
          </CollapsibleTrigger>
        )}
        <Link href={`/task/${task.id}/detail`}>{task.name}</Link>
      </div>
      <CollapsibleContent>
        <div className="ml-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
