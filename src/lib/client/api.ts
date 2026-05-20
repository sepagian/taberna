import { toast } from "svelte-sonner";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new ApiError(
      data.error ?? `Request failed with status ${response.status}`,
      response.status,
    );
  }
  return (await response.json()) as T;
}

export const api = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return handleResponse<T>(response);
  },

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async patch<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: "DELETE" });
    return handleResponse<T>(response);
  },
};

export function withToast<T>(
  promise: Promise<T>,
  {
    loading,
    success,
    error,
  }: {
    loading: string;
    success: string | ((data: T) => string);
    error?: string | ((err: unknown) => string);
  },
): Promise<T> {
  toast.promise(promise, {
    loading,
    success,
    error: error ?? ((err: unknown) => (err instanceof Error ? err.message : "Error")),
  });
  return promise;
}

export { ApiError };
