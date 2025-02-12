import {
  createFileRoute,
  Link,
  Outlet,
  useLoaderData,
} from "@tanstack/react-router";
import { fetchUsers, User } from "../utils";
import { createServerFn } from "@tanstack/start";

const fetchUsersServer = createServerFn().handler(async () => {
  const users = await fetchUsers();
  console.log("Users on server", users);
  return users;
});

export const Route = createFileRoute("/users")({
  loader: async () => {
    const users = await fetchUsersServer();
    console.log("Users on client", users);
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
        <Outlet />
      </div>
    </>
  );
}
