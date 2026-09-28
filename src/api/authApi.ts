//-------Types-------

import type { User } from "../types";

//-------Auth Response Type-------

export type AuthResponse = {
  token: string;
  user: User;
};

//-------Helpers-------

async function parseResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
  } & T;

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}.`,
    );
  }

  return data as T;
}

//-------Register-------

export async function registerUser(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  return parseResponse<AuthResponse>(response);
}

//-------Login-------

export async function loginUser(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  return parseResponse<AuthResponse>(response);
}

//-------Current User-------

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch("/api/auth/me", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await parseResponse<{ user: User }>(response);

  return data.user;
}
