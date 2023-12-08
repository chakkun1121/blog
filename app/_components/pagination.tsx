import Link from "next/link";
import { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function Pagination({
  finallyPage,
  currentPage,
}: {
  finallyPage: number;
  currentPage: number;
}) {
  const pageList = [...Array(finallyPage)].map((_, i) => i + 1);
  return (
    <div className="flex justify-center p-2">
      <LinkButton
        href={`/page/${currentPage - 1}`}
        isCurrent={false}
        disabled={currentPage === 1}
        className="rounded-l"
      >
        <IoIosArrowBack aria-label="前ページへ" />
      </LinkButton>
      {pageList.map((page, i, list) => {
        if (i > 3 || i < list.length - 3) return;
        return (
          <LinkButton
            key={page}
            href={`/page/${page}`}
            isCurrent={page === currentPage}
            disabled={false}
          >
            {page}
          </LinkButton>
        );
      })}
      <LinkButton
        href={`/page/${currentPage + 1}`}
        isCurrent={false}
        disabled={currentPage === finallyPage}
        className="rounded-r"
      >
        <IoIosArrowBack transform="rotate(180)" aria-label="次のページへ" />
      </LinkButton>
    </div>
  );
}
function LinkButton({
  href,
  isCurrent,
  disabled,
  className,
  children,
}: {
  href: string;
  isCurrent?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const thisClassName = `${className} flex items-center p-2 text-black no-underline visited:text-black hover:text-black ${
    isCurrent && "bg-gray-200"
  } ${disabled && "text-gray-499 bg-gray-400"}`;
  return (
    <>
      {disabled ? (
        <p className={thisClassName}>{children}</p>
      ) : (
        <Link href={href} className={thisClassName}>
          {children}
        </Link>
      )}
    </>
  );
}
