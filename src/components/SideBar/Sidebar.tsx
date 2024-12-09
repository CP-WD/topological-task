import { PlusIcon } from "lucide-react";
import { TaskTree } from "~/components/Tree/TaskTree/TaskTree";
import { Sidebar as ShadcnSidebar } from "~/components/ui/sidebar";
import { ROOT_TASK_ID } from "~/constants/constants";
import { Task } from "~/types/Task";

export const Sidebar = ({
  rootId,
  tasks,
  adjacencyMap
}: {
  rootId: string;
  tasks: Task[];
  adjacencyMap: Map<string, string[]>;
}) => {
  return (
    <ShadcnSidebar>
      <TaskTree rootId={rootId} tasks={tasks} adjacencyMap={adjacencyMap} />
      <div className="flex justify-center">
        <a href={`/task/${ROOT_TASK_ID}/new`}>
          <PlusIcon />
        </a>
      </div>
    </ShadcnSidebar>
  );
};
