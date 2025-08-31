import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
  "/exemples/api/demo-names",
).methods({
  GET: () => {
    return new Response(JSON.stringify(["Alice", "Bob", "Charlie"]), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
