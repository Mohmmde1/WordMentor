import { Toaster } from "sonner";
export const metadata = {
  title: "profile",
};

export default function Layout({ children }) {
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      {children}
    </>
  );
}
