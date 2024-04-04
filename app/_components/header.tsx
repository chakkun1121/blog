import Link from "next/link";
import { ModeToggle } from "./modeToggle";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between p-2">
      <Link href="/" className="text-3xl">
        <h1>chakkun1121's blog</h1>
      </Link>
      <ModeToggle className="" />
    </header>
  );
}
