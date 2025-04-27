import Link from "next/link";
import { Graph } from "~/components/Graph/Graph";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getAllRelationEdge } from "~/utils/db/server/relationEdge";
import { getAllTasks } from "~/utils/db/server/task";
import { genGraphDefinition } from "~/utils/graph/cytoscape/genGraphDefinition";
import { canTopologicallySort } from "~/utils/graph/topologicalSort";

const fetchData = async () => {
  const tasks = await getAllTasks();
  const { containmentEdges, dependencyEdges } = await getAllRelationEdge();

  if (!tasks || !containmentEdges || !dependencyEdges) {
    throw new Error("Failed to fetch data");
  }

  return {
    tasks,
    containmentEdges,
    dependencyEdges
  };
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { tasks, containmentEdges, dependencyEdges } = await fetchData();

  const containmentElements = genGraphDefinition(id, tasks, containmentEdges);
  const dependencyElements = genGraphDefinition(id, tasks, dependencyEdges);
  const allElements = genGraphDefinition(id, tasks, [...containmentEdges, ...dependencyEdges]);
  const canSort = canTopologicallySort([...dependencyEdges], id);

  return (
    <>
      <Tabs defaultValue="containment" className="">
        <TabsList className="flex justify-start">
          <TabsTrigger value="containment">Containment</TabsTrigger>
          <TabsTrigger value="dependency">Dependency</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="containment">
          <div className="h-[400px]">
            <Graph elements={containmentElements} />
          </div>
        </TabsContent>
        <TabsContent value="dependency">
          <div className="h-[400px]">
            <Graph elements={dependencyElements} />
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="h-[400px]">
            <Graph elements={allElements} />
          </div>
        </TabsContent>
      </Tabs>

      <p>
        <Button asChild disabled={!canSort}>
          <Link href={`/task/${id}/sort`}>view topological sort</Link>
        </Button>
      </p>
    </>
  );
};

export default Page;
