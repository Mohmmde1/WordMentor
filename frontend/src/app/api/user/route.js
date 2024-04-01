import { getUserId } from "@/lib/utils";

export async function GET(request) {
  const data = { userId: getUserId() };
  return Response.json({ data });
}
