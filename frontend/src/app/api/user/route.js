import { getUserId } from "@/lib/utils";

export async function GET(request) {
  return Response.json({ userId: getUserId() });
}
