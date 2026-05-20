import type { Session, User } from "better-auth/minimal";
import { createAuth } from "$lib/server/auth";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
      ctx: ExecutionContext;
      env: Env;
    }

    interface Locals {
      auth: ReturnType<typeof createAuth>;
      session?: Session;
      user?: User;
    }

    // interface Error {}
    // interface PageData {}
    // interface PageState {}
  }
}
