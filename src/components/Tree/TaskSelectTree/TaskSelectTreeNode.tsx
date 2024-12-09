"use client";

import { ChevronRight } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import { genOutgoingNeighbors } from "~/utils/graph/genNeighbors";

type SelectTreeItem = Task & { isDependency: boolean };

type SelectTreeNodeProps = {
  item: SelectTreeItem;
  hasChild: boolean;
};

export const buildSelectTreeItems = (sourceId: string, tasks: Task[], dependencyEdges: RelationEdge[]) => {
  const outgoingNeighborsSet = new Set(genOutgoingNeighbors(sourceId, dependencyEdges));

  return tasks.map((task) => ({
    ...task,
    isDependency: outgoingNeighborsSet.has(task.id)
  }));
};

export const SelectTreeNode = ({ item, hasChild, children }: PropsWithChildren<SelectTreeNodeProps>): ReactNode => {
  return (
    <Collapsible>
      <div className= {`flex items-center ${hasChild ? "" : "ml-[24px]"}`}>
        {hasChild && (
          <CollapsibleTrigger className="data-[state=open]:rotate-90 transition">
            <ChevronRight />
          </CollapsibleTrigger>
        )}

        <Checkbox name={item.id} id={item.id} defaultChecked={item.isDependency} />
        <label htmlFor={item.id}>{item.name}</label>
      </div>
      <CollapsibleContent className="ml-[24px]">{children}</CollapsibleContent>
    </Collapsible>
  );
};
