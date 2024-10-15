"use client";

import { PropsWithChildren, ReactNode, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        {hasChild && <input type="checkbox" onChange={(e) => setIsOpen(e.target.checked)} />}
        <label>{item.name}</label>
        <input type="checkbox" name={item.id} defaultChecked={item.isDependency} />
      </div>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  );
};
