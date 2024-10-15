import { redirect } from "next/navigation";
import { handleUpdateTask } from "~/app/task/[id]/edit/updateTask";
import { TaskForm } from "~/components/TaskForm/TaskForm";
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

  const formAction = async (formData: FormData) => {
    "use server";
    handleUpdateTask(formData, id);
    redirect(`/task/${id}/detail`);
  };

  const { task } = await fetchData(id);

  return <TaskForm task={task} formAction={formAction} />;
};

export default Page;
