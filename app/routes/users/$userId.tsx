import { Await, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { fetchUser, fetchUserDeferred } from "../../utils";
import { Suspense } from "react";
const getUserServerFn = createServerFn({ method: "GET" })
  .validator(z.number())
  .handler(async ({ data }) => {
    return fetchUserDeferred(data);
  });

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const user = getUserServerFn({ data: Number(params.userId) });
    return { user };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await promise={user}>
        {(user) => (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
