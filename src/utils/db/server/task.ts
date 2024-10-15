import { Task } from "~/types/Task";
import { createClient } from "~/utils/db/supabase/client/server";

const taskTableName = "task";

export const insertTask = async (newTask: Task) => {
  const supabase = createClient();
  const { data: resTask } = await supabase.from(taskTableName).insert(newTask);

  return resTask;
};

export const getAllTasks = async () => {
  const supabase = createClient();
  const { data: tasks } = await supabase.from(taskTableName).select();

  return tasks;
};

export const getTask = async (taskId: string) => {
  const supabase = createClient();
  const { data: task } = await supabase.from(taskTableName).select().match({ id: taskId }).single();

  return task;
};

export const updateTask = async (task: Task) => {
  const supabase = createClient();
  const { data: resTask } = await supabase.from(taskTableName).update(task).match({ id: task.id });

  return resTask;
};

export const deleteTask = async (taskId: string) => {
  const supabase = createClient();
  const { data: resTask } = await supabase.from(taskTableName).delete().match({ id: taskId });

  return resTask;
};
