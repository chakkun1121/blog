"use client";
import React, { useEffect } from "react";
import { CiShare2 } from "react-icons/ci";

export function BlogShareButton({ url }) {
  async function shareURL() {
    const result = await navigator.share({ url });
  }
  return (
    <div className="flex  flex-none flex-col items-center">
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full "
        onClick={shareURL}
        title="ページをシュア"
      >
        <CiShare2 className="h-1/3 w-1/3" />
      </button>
    </div>
  );
}
