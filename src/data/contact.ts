export const contactCategories = [
  "業務のシステム化",
  "既存システムの改善",
  "新規システム開発",
  "その他",
] as const;

export type ContactData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  consent: boolean;
  website: string;
};
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export const contactLimits = {
  company: 120,
  name: 80,
  email: 254,
  phone: 40,
  category: 40,
  message: 5000,
  website: 200,
};
// Reject control characters intentionally, including header injection.
// eslint-disable-next-line no-control-regex
const singleLineControls = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;
const multilineControls =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/;
export const validEmail = (value: string) =>
  value.length <= 254 &&
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(
    value,
  ) &&
  !value.includes("..");

export function validateContact(input: unknown): {
  data: ContactData;
  errors: ContactErrors;
} {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const data: ContactData = {
    company: "",
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
    consent: source.consent === true,
    website: "",
  };
  const errors: ContactErrors = {};
  for (const key of Object.keys(
    contactLimits,
  ) as (keyof typeof contactLimits)[]) {
    const raw = source[key];
    if (raw !== undefined && typeof raw !== "string") {
      errors[key] = "文字列で入力してください。";
      continue;
    }
    const value = typeof raw === "string" ? raw : "";
    data[key] = value.trim();
    if (value.length > contactLimits[key])
      errors[key] = `${contactLimits[key]}文字以内で入力してください。`;
    else if (
      (key === "message" ? multilineControls : singleLineControls).test(value)
    )
      errors[key] = "使用できない文字が含まれています。";
  }
  for (const key of ["company", "name", "email", "message"] as const) {
    if (!data[key] && !errors[key]) errors[key] = "入力してください。";
  }
  if (data.email && !validEmail(data.email))
    errors.email = "有効なメールアドレスを入力してください。";
  if (
    data.category &&
    !contactCategories.some((category) => category === data.category)
  )
    errors.category = "選択肢から選んでください。";
  if (data.phone && !/^[0-9+()\-\s]+$/.test(data.phone))
    errors.phone = "電話番号を半角数字・記号で入力してください。";
  if (!data.consent) errors.consent = "個人情報の取扱いへの同意が必要です。";
  return { data, errors };
}
