"use client";
import { Button } from "@/components/ui/button";
import { CiShare2 } from "react-icons/ci";

export function BlogShareButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  async function shareURL() {
    const result = await navigator.share({ url, title });
  }
  return (
    <Button
      className="flex h-16 w-16 flex-none items-center justify-center rounded-full p-2"
      onClick={shareURL}
      title="ページをシュア"
    >
      <CiShare2 className="h-1/2 w-1/2" />
    </Button>
  );
}
