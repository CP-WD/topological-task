import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Task } from "~/types/Task";

export const TaskForm = ({ task, formAction }: { task?: Task; formAction: (formData: FormData) => Promise<never> }) => {
  return (
    <div>
      <form action={formAction}>
        <div className="flex items-center">
          <Input name="name" placeholder="Title" required defaultValue={task?.name} />
          <Checkbox name="completed" defaultChecked={task?.completed} />
        </div>
        <Textarea name="description" placeholder="Description" required defaultValue={task?.description} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};
