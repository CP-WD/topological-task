import { Task } from "~/types/Task";

export const TaskForm = ({ task, formAction }: { task?: Task; formAction: (formData: FormData) => Promise<never> }) => {
  return (
    <div>
      <form action={formAction}>
        <input type="text" name="name" required defaultValue={task?.name} className="input input-bordered" />
        <input
          type="text"
          name="description"
          required
          defaultValue={task?.description}
          className="input input-bordered"
        />
        <input type="checkbox" name="completed" defaultChecked={task?.completed} className="checkbox" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
