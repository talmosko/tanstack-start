import { queryOptions } from "@tanstack/react-query";
import { User } from "@utils/db";
const DEPLOY_URL = "http://localhost:3000";

type UserWithDate = User & { date: Date };

export const fetchUser = async (id: number) => {
  const res = await fetch(`${DEPLOY_URL}/api/users/${id}`);
  return res.json() as Promise<UserWithDate>;
};

export const fetchUserDeferred = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return fetchUser(id);
};

// Query options for fetching a single user
export const getUserQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["user", id] as const,
    queryFn: () => fetchUser(id),
  });

export const getUserDeferredQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["user-deferred", id] as const,
    queryFn: () => fetchUserDeferred(id),
  });
