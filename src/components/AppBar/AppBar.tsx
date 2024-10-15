import Link from "next/link";

export const AppBar = () => {
  return (
    <nav>
      <div className="w-screen">
        <Link href="/task">Task</Link>
      </div>
    </nav>
  );
};
