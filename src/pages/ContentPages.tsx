import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { DetailPageHero } from "../components/DetailPageHero";
import { PageMeta } from "../components/PageMeta";
import {
  contactCategories,
  contactLimits,
  validateContact,
  type ContactData,
  type ContactErrors,
} from "../data/contact";
import "../styles/pages/detail-page.css";
import "../styles/pages/content-pages.css";

const labels = {
  company: "会社名",
  name: "氏名",
  email: "メールアドレス",
  phone: "電話番号",
  category: "相談内容の分類",
  message: "現在困っている業務・作りたいシステム",
  consent: "個人情報の取扱いへの同意",
};
const empty: ContactData = {
  company: "",
  name: "",
  email: "",
  phone: "",
  category: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactPage() {
  const [data, setData] = useState<ContactData>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const noticeRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const sending = useRef(false);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (status === "error" || status === "success") noticeRef.current?.focus();
  }, [status, errors]);
  const update = (key: keyof ContactData, value: string | boolean) =>
    setData((current) => ({ ...current, [key]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const checked = validateContact(data);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) {
      setNotice("入力内容を確認してください。");
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setNotice("");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 35000);
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
        signal: controller.current.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        if (response.status === 422 && result.errors) setErrors(result.errors);
        setNotice(
          response.status === 429
            ? "送信回数が多いため、時間をおいて再度お試しください。"
            : "送信できませんでした。時間をおいて再度お試しください。",
        );
        setStatus("error");
        return;
      }
      setData(empty);
      setStatus("success");
    } catch {
      setNotice(
        "送信完了を確認できませんでした。時間をおいて再度お試しいただくか、メールでお問い合わせください。",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
    }
  }
  return (
    <>
      <PageMeta
        title="お問い合わせ | TEIRESIAS合同会社"
        description="作りたいシステムが決まっていても、まだ課題しか見えていなくてもご相談ください。現在の業務からシステム化する範囲を整理します。"
      />
      <main
        id="main-content"
        className="detail-page content-page"
        tabIndex={-1}
      >
        <Breadcrumbs current="お問い合わせ" />
        <DetailPageHero
          eyebrow="CONTACT"
          title="この業務、システムにできる？ そこからご相談ください。"
          description="作りたいシステムが決まっていても、まだ課題しか見えていなくても構いません。現在の業務を確認し、何をどうシステム化するべきかから整理します。"
          number="06"
        />
        <section
          className="detail-section contact-section"
          aria-labelledby="contact-form-title"
        >
          <div className="container contact-grid">
            <div className="contact-intro">
              <p className="eyebrow">GET IN TOUCH</p>
              <h2 id="contact-form-title">
                業務のことから、
                <br />
                お聞かせください。
              </h2>
              <p>
                専門用語や、完成した要件定義は必要ありません。困っている作業や、実現したいことを分かる範囲でお知らせください。
              </p>
              <p>
                フォームを利用できない場合は、メールでもご相談いただけます。
              </p>
              <a className="text-link" href="mailto:info@teiresias.jp">
                info@teiresias.jp
              </a>
            </div>
            <div>
              {status === "success" ? (
                <div
                  className="form-notice form-notice--success"
                  tabIndex={-1}
                  ref={noticeRef}
                  role="status"
                >
                  <h3>お問い合わせを送信しました。</h3>
                  <p>
                    ご相談ありがとうございます。内容を確認し、ご入力のメールアドレスへご連絡します。
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  noValidate
                  aria-labelledby="contact-form-title"
                  aria-busy={status === "sending"}
                >
                  <p className="form-help">「必須」の項目をご入力ください。</p>
                  {status === "error" && (
                    <div
                      className="form-notice form-notice--error"
                      tabIndex={-1}
                      ref={noticeRef}
                      role="alert"
                    >
                      <p>{notice}</p>
                      {!!Object.keys(errors).length && (
                        <ul>
                          {(Object.keys(labels) as (keyof typeof labels)[])
                            .filter((key) => errors[key])
                            .map((key) => (
                              <li key={key}>
                                <a href={`#contact-${key}`}>
                                  {labels[key]}：{errors[key]}
                                </a>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                  <fieldset
                    disabled={status === "sending"}
                    className="contact-fields"
                  >
                    <legend className="visually-hidden">
                      お問い合わせ内容
                    </legend>
                    {(["company", "name", "email", "phone"] as const).map(
                      (key) => (
                        <div className="form-field" key={key}>
                          <label htmlFor={`contact-${key}`}>
                            {labels[key]}{" "}
                            <span>{key === "phone" ? "任意" : "必須"}</span>
                          </label>
                          <input
                            id={`contact-${key}`}
                            name={key}
                            type={
                              key === "email"
                                ? "email"
                                : key === "phone"
                                  ? "tel"
                                  : "text"
                            }
                            autoComplete={
                              {
                                company: "organization",
                                name: "name",
                                email: "email",
                                phone: "tel",
                              }[key]
                            }
                            required={key !== "phone"}
                            maxLength={contactLimits[key]}
                            value={data[key]}
                            onChange={(event) =>
                              update(key, event.target.value)
                            }
                            aria-invalid={!!errors[key]}
                            aria-describedby={
                              errors[key] ? `error-${key}` : undefined
                            }
                          />
                          {errors[key] && (
                            <p className="field-error" id={`error-${key}`}>
                              {errors[key]}
                            </p>
                          )}
                        </div>
                      ),
                    )}
                    <div className="form-field">
                      <label htmlFor="contact-category">
                        相談内容の分類 <span>任意</span>
                      </label>
                      <select
                        id="contact-category"
                        name="category"
                        value={data.category}
                        onChange={(event) =>
                          update("category", event.target.value)
                        }
                        aria-invalid={!!errors.category}
                        aria-describedby={
                          errors.category ? "error-category" : undefined
                        }
                      >
                        <option value="">選択してください</option>
                        {contactCategories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="field-error" id="error-category">
                          {errors.category}
                        </p>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-message">
                        {labels.message} <span>必須</span>
                      </label>
                      <p className="form-help" id="message-help">
                        現在の進め方、困っていること、実現したいことなど。5,000文字以内でご入力ください。
                      </p>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={8}
                        required
                        maxLength={contactLimits.message}
                        value={data.message}
                        onChange={(event) =>
                          update("message", event.target.value)
                        }
                        aria-invalid={!!errors.message}
                        aria-describedby={`message-help${errors.message ? " error-message" : ""}`}
                      />
                      {errors.message && (
                        <p className="field-error" id="error-message">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="contact-honeypot" aria-hidden="true">
                      <label htmlFor="contact-website">
                        この項目は空欄のままにしてください
                      </label>
                      <input
                        id="contact-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(event) =>
                          update("website", event.target.value)
                        }
                      />
                    </div>
                    <div className="form-consent">
                      <label htmlFor="contact-consent">
                        <input
                          id="contact-consent"
                          name="consent"
                          type="checkbox"
                          required
                          checked={data.consent}
                          onChange={(event) =>
                            update("consent", event.target.checked)
                          }
                          aria-invalid={!!errors.consent}
                          aria-describedby={
                            errors.consent ? "error-consent" : undefined
                          }
                        />
                        <span>個人情報の取扱いに同意する（必須）</span>
                      </label>
                      <Link
                        to="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        プライバシーポリシーを確認する（新しいタブ）
                      </Link>
                      {errors.consent && (
                        <p className="field-error" id="error-consent">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                    <button
                      className="button button--primary"
                      type="submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "送信中…" : "相談内容を送信する"}
                    </button>
                  </fieldset>
                  <p className="visually-hidden" role="status">
                    {status === "sending"
                      ? "お問い合わせを送信しています。"
                      : ""}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const privacySections = [
  [
    "取得する情報",
    "お問い合わせフォームから、会社名、氏名、メールアドレス、電話番号（任意）、相談内容の分類（任意）、お問い合わせ内容、個人情報の取扱いへの同意を取得します。また、不正利用防止のため、IPアドレス等の通信情報を処理することがあります。",
  ],
  [
    "利用目的",
    "取得した情報は、お問い合わせへの回答、商談・連絡、サービス提供に必要な確認、不正利用の防止のために利用します。",
  ],
  [
    "第三者提供",
    "法令に基づく場合などを除き、ご本人の同意なく個人情報を第三者に提供しません。利用目的の達成に必要な範囲で、情報の取扱いを外部事業者に委託する場合があります。",
  ],
  [
    "外部サービスと情報の取扱い",
    "本サイトの本番環境にはロリポップ！レンタルサーバーを利用します。お問い合わせ内容は、サーバーのPHPメール送信機能を通じて当社へ送信されます。本サイト独自の問い合わせデータベースには保存しませんが、対応に必要な期間、当社のメール環境等で管理します。外部サービスでは、運用・安全確保のために通信ログ等が処理される場合があります。また、文字の表示にGoogle Fontsを利用しており、フォント取得時に通信情報がGoogleへ送信されます。",
  ],
  [
    "安全管理",
    "個人情報への不正アクセス、漏えい、紛失等を防ぐため、アクセス管理や暗号化通信など、適切な安全管理措置に努めます。対応上不要となった情報は、法令上の保存義務等を考慮し、適切に削除・廃棄します。",
  ],
  [
    "開示・訂正・削除等",
    "ご自身の個人情報について、開示、訂正、削除、利用停止等を希望される場合は、下記窓口へご連絡ください。ご本人確認のうえ、法令に従い適切に対応します。",
  ],
  [
    "改定",
    "本方針は、運用や法令の変更等に応じて見直すことがあります。改定した内容は本ページでお知らせします。",
  ],
];
export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="プライバシーポリシー | TEIRESIAS合同会社"
        description="TEIRESIAS合同会社が、お問い合わせ等を通じて取得する個人情報の利用目的、安全管理、お問い合わせ窓口をご案内します。"
      />
      <main
        id="main-content"
        className="detail-page content-page"
        tabIndex={-1}
      >
        <Breadcrumbs current="プライバシーポリシー" />
        <DetailPageHero
          eyebrow="PRIVACY POLICY"
          title="個人情報の取扱いについて。"
          description="TEIRESIAS合同会社は、お問い合わせ等を通じてお預かりする個人情報を、以下の方針に基づき取り扱います。"
          number="07"
        />
        <div className="container privacy-content">
          {privacySections.map(([title, body], index) => (
            <section key={title} aria-labelledby={`privacy-${index}`}>
              <h2 id={`privacy-${index}`}>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">お問い合わせ窓口</h2>
            <p>
              TEIRESIAS合同会社
              <br />
              <a href="mailto:info@teiresias.jp">info@teiresias.jp</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
