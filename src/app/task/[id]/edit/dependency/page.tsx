import { redirect } from "next/navigation";
import { updateDependency as handleUpdateDependency } from "~/app/task/[id]/edit/dependency/updateDependencyEdge";
import { TaskSelectTree } from "~/components/Tree/TaskSelectTree/TaskSelectTree";
import { getAllRelationEdge } from "~/utils/db/server/relationEdge";
import { getAllTasks } from "~/utils/db/server/task";

const fetchData = async () => {
  const allTasks = await getAllTasks();
  const { containmentEdges, dependencyEdges } = await getAllRelationEdge();

  if (!allTasks || !containmentEdges || !dependencyEdges) {
    throw new Error("Failed to fetch data");
  }

  return { allTasks, containmentEdges, dependencyEdges };
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { allTasks, containmentEdges, dependencyEdges } = await fetchData();

  const submitAction = async (formData: FormData) => {
    "use server";
    handleUpdateDependency(formData, id, allTasks, dependencyEdges);
    redirect(`/task/${id}/detail`);
  };

  return (
    <div>
      <form action={submitAction}>
        <TaskSelectTree
          sourceId={id}
          tasks={allTasks}
          containmentEdges={containmentEdges}
          dependencyEdges={dependencyEdges}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Page;
