import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { createAuth } from "$lib/server/auth";

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  const d1 = event.platform?.env?.DB ?? null;
  if (!d1 && process.env.NODE_ENV !== "development") {
    throw new Error('D1 binding "DB" not found - are you running with wrangler?');
  }

  event.locals.auth = createAuth(d1);

  const { auth } = event.locals;
  const session = await auth.api.getSession({ headers: event.request.headers });

  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
