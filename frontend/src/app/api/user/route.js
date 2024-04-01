import { redirect } from "next/navigation";
import { getUserId } from "@/app/lib/utils";

export async function GET(request) {
  const data = { userId: getUserId() };
  return Response.json({ data });
}
