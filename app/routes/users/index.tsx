import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { User } from "../../utils/db";

export const DEPLOY_URL = "http://localhost:3000";
export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>select a user</p>;
}
