import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { fetchUser } from "~/utils";

export const APIRoute = createAPIFileRoute("/api/users/$userId")({
  GET: async ({ request, params }) => {
    return json(await fetchUser(Number(params.userId)));
  },
});
