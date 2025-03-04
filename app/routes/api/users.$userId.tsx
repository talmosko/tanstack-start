import { getUserById } from '@/utils/db';
import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/users/$userId')({
  GET: async ({ request, params }) => {
    const user = await getUserById(Number(params.userId));
    return json({ ...user, date: new Date() });
  },
});
