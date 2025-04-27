import { redirect } from "next/navigation";
import { Card } from "~/components/ui/card";
import { RelationEdge } from "~/types/RelationEdge";
import { Task } from "~/types/Task";
import { getAllRelationEdge } from "~/utils/db/server/relationEdge";
import { getAllTasks } from "~/utils/db/server/task";
import { genOutgoingAdjacencyMap } from "~/utils/graph/genAdjacencyMap";
import { validateAndTopologicalSort } from "~/utils/graph/topologicalSort";

const fetchData = async () => {
  const tasks = await getAllTasks();
  const { containmentEdges } = await getAllRelationEdge();

  if (!tasks || !containmentEdges) {
    throw new Error("Failed to fetch data");
  }

  return {
    tasks,
    containmentEdges
  };
};

const processData = (tasks: Task[], containmentEdges: RelationEdge[], rootId: string) => {
  const revAdjacencyMap = genOutgoingAdjacencyMap(containmentEdges);
  const { sortedTasks, sorted } = validateAndTopologicalSort(tasks, revAdjacencyMap, rootId);
  return { sortedTasks, sorted };
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetchData();
  const { sortedTasks, sorted } = processData(data.tasks, data.containmentEdges, id);

  if (!sorted || !sortedTasks) {
    redirect(`/task/${id}/graph`);
  }

  return (
    <div className="space-y-2">
      {sortedTasks.map((task) => (
        <Card key={task.id} className="p-2">
          <div key={task.id}>
            <div>{task.name}</div>
            <div>{task.description}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Page;
