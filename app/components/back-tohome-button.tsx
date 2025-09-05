"use client";

import { useRouter } from "next/navigation";

export default function BackToHomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        data-cy="Back-to-home"
    >
      Back to homepage
    </button>
  );
}
