import { attachDatabasePool } from "@vercel/functions";
import { Pool } from "pg";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f-]{36}$/i;
const wagers = new Set([
  "",
  "regularly",
  "occasionally",
  "previously",
  "never",
]);
const familiarity = new Set(["", "used", "heard", "unfamiliar"]);
const allowedPriorities = new Set([
  "Fair matchmaking",
  "Trustworthy verification",
  "Fast payouts",
  "Low fees",
  "Playing with friends",
  "Anti-cheat protection",
]);
const reply = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, max: 5 })
  : null;

if (pool) attachDatabasePool(pool);

export default {
  async fetch(request: Request) {
    if (request.method !== "POST")
      return reply({ error: "Method not allowed" }, 405);
    if (!pool)
      return reply({ error: "Waitlist storage is not configured" }, 503);
    try {
      const body = (await request.json()) as Record<string, unknown>;
      if (body.action === "join") {
        const email = String(body.email || "")
          .trim()
          .toLowerCase();
        const firstName = String(body.firstName || "")
          .trim()
          .slice(0, 80);
        const source = String(body.source || "website").slice(0, 80);
        if (
          !emailPattern.test(email) ||
          email.length > 254 ||
          body.consent !== true
        )
          return reply({ error: "Valid email and consent required" }, 400);
        const result = await pool.query<{ id: string }>(
          "insert into waitlist_signups (email, first_name, source, consented_at) values ($1, $2, $3, now()) on conflict (email) do update set first_name = coalesce(excluded.first_name, waitlist_signups.first_name), source = excluded.source, consented_at = now(), updated_at = now() returning id",
          [email, firstName || null, source],
        );
        return reply({ id: result.rows[0].id });
      }
      if (body.action === "survey") {
        const id = String(body.id || ""),
          wager = String(body.wagerFrequency || "");
        const platforms = (body.platforms || {}) as Record<string, unknown>;
        const playersLounge = String(platforms.playersLounge || ""),
          triumph = String(platforms.triumph || "");
        const priorities = Array.isArray(body.priorities)
          ? body.priorities.map(String)
          : [];
        if (
          !uuidPattern.test(id) ||
          !wagers.has(wager) ||
          !familiarity.has(playersLounge) ||
          !familiarity.has(triumph) ||
          priorities.length > 2 ||
          priorities.some((p) => !allowedPriorities.has(p))
        )
          return reply({ error: "Invalid survey response" }, 400);
        await pool.query(
          "insert into waitlist_surveys (waitlist_id, wager_frequency, platform_familiarity, priorities, completed_at) values ($1, $2, $3::jsonb, $4, now()) on conflict (waitlist_id) do update set wager_frequency = excluded.wager_frequency, platform_familiarity = excluded.platform_familiarity, priorities = excluded.priorities, completed_at = now()",
          [
            id,
            wager || null,
            JSON.stringify({ playersLounge, triumph }),
            priorities,
          ],
        );
        return reply({ ok: true });
      }
      return reply({ error: "Unknown action" }, 400);
    } catch (error) {
      console.error("waitlist request failed", error);
      return reply({ error: "Unable to save waitlist response" }, 500);
    }
  },
};
