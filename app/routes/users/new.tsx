import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { createUser, userSchema } from "@utils/db";

const createUserServerFn = createServerFn({ method: "POST" })
  .validator(userSchema)
  .handler(async ({ data }) => {
    await createUser(data);
  });

export const Route = createFileRoute("/users/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const createUserAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const username = formData.get("username");
    await createUserServerFn({
      data: {
        name: name as string,
        email: email as string,
        username: username as string,
      },
    });

    await router.invalidate();
    router.navigate({ to: "/users" });
  };

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
