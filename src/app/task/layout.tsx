import { ReactNode } from "react";
import { AppBar } from "~/components/AppBar/AppBar";
import { Sidebar } from "~/components/SideBar/Sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
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
      <SidebarProvider>
        <Sidebar rootId={ROOT_TASK_ID} tasks={allTasks} adjacencyMap={adjacencyMap} />
        <AppBar />
        <div className="h-screen max-w-screen-lg mx-auto p-5">{children}</div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
