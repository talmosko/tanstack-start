import {
  createFileRoute,
  Link,
  Outlet,
  useLoaderData,
} from "@tanstack/react-router";
import { getAllUsers, User } from "../utils/db";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";

const fetchUsersServer = createServerFn().handler(async () => {
  const users = await getAllUsers();
  return users;
});

export const Route = createFileRoute("/users")({
  loader: async () => {
    const users = await fetchUsersServer();
    return users;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const users = Route.useLoaderData();
  return (
    <>
      <h1>Users</h1>

      <div className="flex items-center gap-10">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link
                to={`/users/$userId`}
                params={{ userId: user.id.toString() }}
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <Suspense fallback="loading...">
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
