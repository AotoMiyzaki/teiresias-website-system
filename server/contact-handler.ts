import { createHash } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { validateContact, type ContactData } from "../src/data/contact.ts";
import { MailUnavailable, sendContactMail } from "./contact-mail.ts";

const MAX_BYTES = 24 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const failure = "送信できませんでした。時間をおいて再度お試しください。";
type RequestWithBody = IncomingMessage & { body?: unknown };
type Sender = (data: ContactData, receivedAt: Date) => Promise<void>;

// Best-effort per-instance protection, not a distributed rate limiter.
export function createContactHandler(send: Sender = sendContactMail) {
  const requests = new Map<string, { count: number; until: number }>();
  return async (req: RequestWithBody, res: ServerResponse) => {
    const reply = (status: number, body: object) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.end(JSON.stringify(body));
    };
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return reply(405, { error: "POSTで送信してください。" });
    }
    if (
      !(req.headers["content-type"] || "")
        .toLowerCase()
        .startsWith("application/json")
    )
      return reply(415, { error: "JSON形式で送信してください。" });
    // Browser requests must come from this deployment. No CORS permission is granted.
    if (req.headers["sec-fetch-site"] === "cross-site")
      return reply(403, { error: failure });
    if (req.headers.origin) {
      try {
        if (new URL(req.headers.origin).host !== req.headers.host)
          return reply(403, { error: failure });
      } catch {
        return reply(403, { error: failure });
      }
    }
    const now = Date.now();
    for (const [key, value] of requests)
      if (value.until <= now) requests.delete(key);
    const forwarded =
      process.env.VERCEL === "1"
        ? req.headers["x-vercel-forwarded-for"]
        : undefined;
    const ip =
      typeof forwarded === "string"
        ? forwarded.split(",")[0].trim()
        : req.socket.remoteAddress || "unknown";
    const key = createHash("sha256").update(ip).digest("hex");
    const counter = requests.get(key) || { count: 0, until: now + WINDOW_MS };
    if (counter.count >= 5 || (!requests.has(key) && requests.size >= 10000)) {
      res.setHeader(
        "Retry-After",
        String(Math.max(1, Math.ceil((counter.until - now) / 1000))),
      );
      return reply(429, {
        error: "送信回数が多いため、時間をおいて再度お試しください。",
      });
    }
    counter.count++;
    requests.set(key, counter);
    if (Number(req.headers["content-length"]) > MAX_BYTES)
      return reply(413, { error: "送信内容が大きすぎます。" });
    let input: unknown;
    try {
      if (req.body !== undefined) {
        const serialized =
          typeof req.body === "string"
            ? req.body
            : Buffer.isBuffer(req.body)
              ? req.body.toString("utf8")
              : JSON.stringify(req.body);
        if (Buffer.byteLength(serialized) > MAX_BYTES)
          return reply(413, { error: "送信内容が大きすぎます。" });
        input = JSON.parse(serialized);
      } else {
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          size += bytes.length;
          if (size > MAX_BYTES)
            return reply(413, { error: "送信内容が大きすぎます。" });
          chunks.push(bytes);
        }
        input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      }
    } catch {
      return reply(400, { error: "送信内容を確認してください。" });
    }
    const { data, errors } = validateContact(input);
    if (data.website)
      return reply(400, { error: "送信内容を確認してください。" });
    if (Object.keys(errors).length)
      return reply(422, { error: "入力内容を確認してください。", errors });
    try {
      await send(data, new Date(now));
      return reply(200, { ok: true });
    } catch (error) {
      // No payload, address, SMTP host, credentials or provider error is logged.
      console.error(
        error instanceof MailUnavailable
          ? "contact: configuration unavailable"
          : "contact: delivery failed",
      );
      return reply(error instanceof MailUnavailable ? 503 : 502, {
        error: failure,
      });
    }
  };
}
