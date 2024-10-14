import Link from "next/link";
import { ROOT_TASK_ID } from "~/constants/constants";

const Page = async () => {
  return (
    <div>
      <Link href={`/task/${ROOT_TASK_ID}/new`}>create task</Link>
    </div>
  );
};

export default Page;
