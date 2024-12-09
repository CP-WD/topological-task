import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox />
          <div className="font-semibold text-4xl">{task.name}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/task/${id}/edit`}>
            <PencilIcon />
          </Link>
          <Link href={`/task/${id}/delete`}>
            <TrashIcon />
          </Link>
        </div>
      </div>

      <p>{task.description.length ? task.description : "There is no description"}</p>

      <p>
        <Button asChild>
          <Link href={`/task/${id}/graph`}>View relation graph</Link>
        </Button>
      </p>

      <p className="space-x-2">
        <Button asChild>
          <Link href={`/task/${id}/new`}>Create child task</Link>
        </Button>
        <Button asChild>
          <Link href={`/task/${id}/edit/dependency`}>Add dependency</Link>
        </Button>
      </p>
    </div>
  );
};

export default Page;
