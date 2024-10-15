"use client";

import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { Task } from "~/types/Task";

export const TaskTreeNode = ({
  item: task,
  hasChild,
  children
}: PropsWithChildren<{ item: Task; hasChild: boolean }>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        {hasChild && <input type="checkbox" onChange={(e) => setIsOpen(e.target.checked)} />}
        <Link href={`/task/${task.id}/detail`}>{task.name}</Link>
      </div>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  );
};
