import { createFileRoute } from "@tanstack/react-router";
import { createUser, inputUserSchema } from "../../utils";
import { createServerFn } from "@tanstack/start";

const createUserServerFn = createServerFn({ method: "POST" })
  .validator(inputUserSchema)
  .handler(async ({ data }) => {
    await createUser(data);
  });

const createUserAction = (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const username = formData.get("username");
  createUserServerFn({
    data: {
      name: name as string,
      email: email as string,
      username: username as string,
    },
  });
};

export const Route = createFileRoute("/users/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="flex flex-col gap-2" action={createUserAction}>
      <h1>Create User</h1>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <label htmlFor="username">Username</label>
      <input type="text" name="username" />
      <button type="submit">Create User</button>
    </form>
  );
}
