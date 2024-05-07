"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold m-4">Something went wrong!</h2>
        <Button className="mt-4" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  );
}
