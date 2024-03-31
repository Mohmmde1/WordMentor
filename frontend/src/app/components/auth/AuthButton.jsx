"use client";

import { useFormStatus } from "react-dom";

export default function AuthButton({ buttonText }) {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="btn btn-primary">
      {buttonText}
    </button>
  );
}
