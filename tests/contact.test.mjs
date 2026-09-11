import test from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { createContactHandler } from "../server/contact-handler.ts";
import { MailUnavailable } from "../server/contact-mail.ts";

const valid = {
  company: "TEST company",
  name: "TEST person",
  email: "test@example.com",
  phone: "",
  category: "",
  message: "TEST only\nNo email is sent by these unit tests.",
  consent: true,
  website: "",
};
async function request(handler, options = {}) {
  const req = Readable.from([
    Buffer.from(options.raw ?? JSON.stringify(options.body ?? valid)),
  ]);
  req.method = options.method || "POST";
  req.headers = {
    host: "localhost:5173",
    "content-type": "application/json",
    ...options.headers,
  };
  req.socket = { remoteAddress: "127.0.0.1" };
  if (options.parsed) req.body = options.body ?? valid;
  const headers = {};
  let body;
  const res = {
    statusCode: 0,
    setHeader: (key, value) => {
      headers[key] = value;
    },
    end: (value) => {
      body = JSON.parse(value);
    },
  };
  await handler(req, res);
  return { status: res.statusCode, headers, body };
}
test("valid data is trimmed and success waits for transport acceptance", async () => {
  let called = false;
  const handler = createContactHandler(async (data, date) => {
    assert.equal(data.company, "TEST company");
    assert.ok(date instanceof Date);
    called = true;
  });
  const result = await request(handler, {
    body: { ...valid, company: " TEST company " },
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.ok(called);
  assert.equal(result.headers["Cache-Control"], "no-store");
});
for (const [label, options, status] of [
  ["method", { method: "GET" }, 405],
  ["content type", { headers: { "content-type": "text/plain" } }, 415],
  ["cross-origin", { headers: { origin: "https://other.example" } }, 403],
  ["fetch metadata", { headers: { "sec-fetch-site": "cross-site" } }, 403],
  ["malformed JSON", { raw: "{" }, 400],
  ["null JSON", { raw: "null" }, 422],
  ["array JSON", { raw: "[]" }, 422],
  ["required", { body: {} }, 422],
  ["email", { body: { ...valid, email: "not-email" } }, 422],
  [
    "header injection",
    { body: { ...valid, name: "A\r\nBcc: another@example.com" } },
    422,
  ],
  ["control character", { body: { ...valid, message: "Bad\u0000text" } }, 422],
  ["max length", { body: { ...valid, company: "a".repeat(121) } }, 422],
  ["consent type", { body: { ...valid, consent: "true" } }, 422],
  ["unknown category", { body: { ...valid, category: "unknown" } }, 422],
  ["honeypot", { body: { ...valid, website: "spam" } }, 400],
  ["declared payload size", { headers: { "content-length": "25000" } }, 413],
  ["streamed payload size", { raw: "x".repeat(25000) }, 413],
  [
    "parsed payload size",
    { parsed: true, body: { ...valid, message: "x".repeat(25000) } },
    413,
  ],
])
  test(label, async () => {
    let called = false;
    const result = await request(
      createContactHandler(async () => {
        called = true;
      }),
      options,
    );
    assert.equal(result.status, status);
    assert.equal(called, false);
    assert.notEqual(result.body.ok, true);
  });
test("Vercel parsed JSON body works", async () => {
  const result = await request(
    createContactHandler(async () => {}),
    { parsed: true },
  );
  assert.equal(result.status, 200);
});
test("sixth request is rate limited with Retry-After", async () => {
  const handler = createContactHandler(async () => {});
  for (let i = 0; i < 5; i++)
    assert.equal((await request(handler)).status, 200);
  const result = await request(handler);
  assert.equal(result.status, 429);
  assert.ok(Number(result.headers["Retry-After"]) > 0);
});
for (const [label, error, code] of [
  ["missing configuration", new MailUnavailable(), 503],
  ["delivery failure", new Error("private SMTP detail"), 502],
]) {
  test(label, async () => {
    const result = await request(
      createContactHandler(async () => {
        throw error;
      }),
    );
    assert.equal(result.status, code);
    assert.notEqual(result.body.ok, true);
    assert.ok(!JSON.stringify(result.body).includes("SMTP"));
  });
}
