import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-yellow-200 p-2 w-full">
      <Link
        href="/"
        className="text-black visited:text-black no-underline "
      >
        <h1>chakkun1121's blog</h1>
      </Link>
    </header>
  );
}
