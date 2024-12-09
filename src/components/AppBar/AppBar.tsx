import Link from "next/link";
import { SidebarTrigger } from "~/components/ui/sidebar";
export const AppBar = () => {
  return (
    <nav>
      <div className="flex items-center ">
        <SidebarTrigger />
        <Link href="/task" className="font-bold text-2xl">
          Task
        </Link>
      </div>
    </nav>
  );
};
