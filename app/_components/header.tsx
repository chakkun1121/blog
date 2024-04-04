import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-yellow-200 p-2">
      <Link href="/" className="text-3xl">
        <h1>chakkun1121's blog</h1>
      </Link>
    </header>
  );
}
