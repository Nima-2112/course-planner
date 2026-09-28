//-------Helpers-------
function getHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",

    Authorization: `Bearer ${token}`,
  };
}

//-------Get Planner-------
export async function getPlanner(token: string): Promise<number[]> {
  const response = await fetch("/api/planner", {
    headers: getHeaders(token),
  });

  const data = (await response.json().catch(() => ({}))) as {
    planner?: number[];
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || "Unable to load saved planner.");
  }

  return Array.isArray(data.planner) ? data.planner : [];
}

//-------Save Planner-------
export async function savePlanner(
  token: string,
  planner: number[],
): Promise<number[]> {
  const response = await fetch("/api/planner", {
    method: "PUT",

    headers: getHeaders(token),

    body: JSON.stringify({
      planner,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    planner?: number[];
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || "Unable to save planner.");
  }

  return Array.isArray(data.planner) ? data.planner : [];
}
