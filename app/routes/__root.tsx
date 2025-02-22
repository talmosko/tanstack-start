import {
  createRootRoute,
  createRootRouteWithContext,
  Link,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import "../styles/app.css";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="m-10">
        <div className="flex gap-2 mb-5">
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/users/new">New User</Link>
        </div>
        <Outlet />
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
