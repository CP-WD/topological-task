import { ReactNode } from "react";
import { TaskTree } from "~/components/Tree/TaskTree/TaskTree";
import { ROOT_TASK_ID } from "~/constants/constants";
import { getAllRelationEdge } from "~/utils/db/server/relationEdge";
import { getAllTasks } from "~/utils/db/server/task";
import { genOutgoingAdjacencyMap } from "~/utils/graph/genAdjacencyMap";

const fetchData = async () => {
  const allTasks = await getAllTasks();
  const { containmentEdges } = await getAllRelationEdge();

  if (!allTasks || !containmentEdges) {
    throw new Error("Failed to fetch data");
  }

  return { allTasks, containmentEdges };
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const { allTasks, containmentEdges } = await fetchData();
  const adjacencyMap = genOutgoingAdjacencyMap(containmentEdges);

  return (
    <div className="flex">
      <aside className="h-screen w-1/4">
        <TaskTree rootId={ROOT_TASK_ID} tasks={allTasks} adjacencyMap={adjacencyMap} />
      </aside>
      <div className="h-screen w-3/4">{children}</div>
    </div>
  );
};

export default Layout;
