import { redirect } from "next/navigation";
import { registerNewTask } from "~/app/task/[id]/new/registerNewTask";
import { TaskForm } from "~/components/TaskForm/TaskForm";

const Page = async ({ params: { id: parentId } }: { params: { id: string } }) => {
  const formAction = async (formData: FormData) => {
    "use server";
    registerNewTask(formData, parentId);
    redirect(`/task/${parentId}/detail`);
  };

  return <TaskForm formAction={formAction} />;
};

export default Page;
