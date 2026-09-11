import nodemailer from "nodemailer";
import { validEmail, type ContactData } from "../src/data/contact.ts";

export class MailUnavailable extends Error {}

export async function sendContactMail(data: ContactData, receivedAt: Date) {
  const env = process.env;
  const port = Number(env.SMTP_PORT);
  const to = env.CONTACT_TO_EMAIL || "info@teiresias.jp";
  const from = env.CONTACT_FROM_EMAIL || "";
  if (
    !env.SMTP_HOST ||
    !env.SMTP_USER ||
    !env.SMTP_PASS ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !["true", "false"].includes(env.SMTP_SECURE || "") ||
    !validEmail(to) ||
    !validEmail(from)
  )
    throw new MailUnavailable();
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: env.SMTP_SECURE === "true",
    requireTLS: env.SMTP_SECURE !== "true",
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });
  try {
    const result = await transport.sendMail({
      from: { name: "TEIRESIAS Web", address: from },
      to,
      replyTo: { name: data.name, address: data.email },
      subject: `【TEIRESIAS Web問い合わせ】${data.company} / ${data.name}`,
      text: [
        `受付日時: ${receivedAt.toISOString()} (UTC)`,
        `会社名: ${data.company}`,
        `氏名: ${data.name}`,
        `メール: ${data.email}`,
        `電話番号: ${data.phone || "未入力"}`,
        `相談分類: ${data.category || "未選択"}`,
        "個人情報の取扱いへの同意: 同意済み",
        "",
        "相談内容:",
        data.message,
      ].join("\n"),
    });
    if (!result.accepted?.length || result.rejected?.length)
      throw new Error("Mail not accepted");
  } finally {
    transport.close();
  }
}
