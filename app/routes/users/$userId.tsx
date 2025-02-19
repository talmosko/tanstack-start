import { Await, createFileRoute, useRouter } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchUserDeferred,
  getUserDeferredQueryOptions,
  getUserQueryOptions,
} from "@/utils/query";

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    // const userPromise = await fetchUserDeferred(Number(params.userId));
    // return { userPromise };
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const router = useRouter();
  const user = useSuspenseQuery(
    getUserDeferredQueryOptions(Number(params.userId))
  );

  //   const { userPromise: userDeferredPromise } = Route.useLoaderData();

  const [counter, setCounter] = useState(0);
  return (
    <>
      <div className="flex flex-col">
        <h2>{user.data.email}</h2>
        <p>{user.data.email}</p>

        <div>
          {/* <p>{new Date(userDeferredPromise.date).toLocaleTimeString()}</p> */}
        </div>

        <p>{counter}</p>
        <button onClick={() => setCounter(counter + 1)}>+1</button>
        <button onClick={() => router.invalidate()}>invalidate</button>
      </div>
    </>
  );
}
