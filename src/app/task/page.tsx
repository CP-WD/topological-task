import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ROOT_TASK_ID } from "~/constants/constants";

const Page = async () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Button asChild>
        <Link href={`/task/${ROOT_TASK_ID}/new`}>create task</Link>
      </Button>
    </div>
  );
};

export default Page;
