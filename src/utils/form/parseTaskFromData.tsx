export const parseTaskFormData = (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const completed = formData.get("completed") === "on";

  return { name, description, completed };
}
