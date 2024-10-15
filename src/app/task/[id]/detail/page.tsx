import Link from "next/link";
import { redirect } from "next/navigation";
import { ROOT_TASK_ID } from "~/constants/constants";
import { getTask } from "~/utils/db/server/task";

const fetchData = async (id: string) => {
  const task = await getTask(id);

  if (!task) {
    throw new Error("Failed to fetch data");
  }

  return { task };
};

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  if (id === ROOT_TASK_ID) {
    redirect("/task");
  }

  const { task } = await fetchData(id);

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      <p>{task.completed ? "Completed" : "Not completed"}</p>
      <p>
        <Link href={`/task/${id}/new`}>Create child task</Link>
      </p>
      <p>
        <Link href={`/task/${id}/edit`}>Edit</Link>
      </p>
      <p>
        <Link href={`/task/${id}/edit/dependency`}>Add dependency</Link>
      </p>
      <button>Delete</button>
    </div>
  );
};

export default Page;
