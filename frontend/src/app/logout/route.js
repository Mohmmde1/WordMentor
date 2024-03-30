import { redirect } from "next/navigation";
import { deleteSessionCookies } from "../lib/utils";

export async function GET(request) {
  deleteSessionCookies();
  redirect(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/`);
}
