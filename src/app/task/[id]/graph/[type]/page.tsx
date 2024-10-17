import { Graph } from "~/components/Graph/Graph";
import { getAllRelationEdge } from "~/utils/db/server/relationEdge";
import { getAllTasks } from "~/utils/db/server/task";
import { genGraphDefinition } from "~/utils/graph/cytoscape/genGraphDefinition";

type GraphType = "containment" | "dependency" | "all";

const fetchData = async (type: GraphType) => {
  const tasks = await getAllTasks();
  const { containmentEdges, dependencyEdges } = await getAllRelationEdge();

  if (!tasks || !containmentEdges || !dependencyEdges) {
    throw new Error("Failed to fetch data");
  }

  if (type === "containment") {
    return {
      tasks,
      relationEdges: containmentEdges
    };
  } else if (type === "dependency") {
    return {
      tasks,
      relationEdges: dependencyEdges
    };
  } else {
    return {
      tasks,
      relationEdges: [...containmentEdges, ...dependencyEdges]
    };
  }
};

const Page = async ({ params: { id, type } }: { params: { id: string; type: string } }) => {
  if (type !== "containment" && type !== "dependency" && type !== "all") {
    return <div>Invalid type</div>;
  }
  const { tasks, relationEdges } = await fetchData(type as GraphType);
  const elements = genGraphDefinition(id, tasks, relationEdges);
  return <Graph elements={elements} />;
};

export default Page;
