import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Button asChild>
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
    </div>
  );
}
