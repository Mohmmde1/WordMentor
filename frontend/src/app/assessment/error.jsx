"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="d-flex justify-content-center">
      <div className="text-center">
        <h2>Something went wrong!</h2>
        <button className="btn btn-primary mt-4" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </main>
  );
}
