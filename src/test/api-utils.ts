import type { RequestEvent } from "@sveltejs/kit";
import type { Kysely } from "kysely";
import { vi } from "vitest";
import type { DB } from "$lib/db";
import { createTestDb, seedTestData } from "$test/db";

const { getDbMock, getUserIdMock } = vi.hoisted(() => ({
  getDbMock: vi.fn(),
  getUserIdMock: vi.fn(),
}));

vi.mock("$lib/server/helpers", async (importOriginal) => {
  const actual = await importOriginal<typeof import("$lib/server/helpers")>();
  return {
    ...actual,
    getDb: getDbMock,
    getUserId: getUserIdMock,
  };
});

export function createEvent(overrides: Partial<RequestEvent> = {}): RequestEvent {
  return {
    params: {},
    request: new Request("http://localhost"),
    url: new URL("http://localhost"),
    cookies: {} as RequestEvent["cookies"],
    fetch: vi.fn(),
    getClientAddress: vi.fn().mockReturnValue("127.0.0.1"),
    locals: {} as App.Locals,
    platform: {},
    route: { id: "" },
    setHeaders: vi.fn(),
    isDataRequest: false,
    isSubRequest: false,
    ...overrides,
  } as RequestEvent;
}

export function setupApiTest() {
  let db: Kysely<DB>;

  beforeEach(async () => {
    db = await createTestDb();
    getDbMock.mockReturnValue(db);
    await seedTestData(db);
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await db.destroy();
  });

  return {
    get db() {
      return db;
    },
    setUserId(id: string | null) {
      getUserIdMock.mockReturnValue(id);
    },
  };
}

export { getDbMock, getUserIdMock };
