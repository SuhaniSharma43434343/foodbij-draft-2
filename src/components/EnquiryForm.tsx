"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { eventTypeOptions, guestOptions, planPage } from "@/content/pages";
import { Txt } from "./Txt";

type Values = {
  name: string;
  phone: string;
  email: string;
  type: string;
  date: string;
  guests: string;
  city: string;
  brief: string;
};
type Errors = Partial<Record<keyof Values | "contact", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please add your name.";
  if (!v.phone.trim() && !v.email.trim()) e.contact = "Please add a phone number or an email, so we can reply.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 8) e.phone = "That phone number looks too short.";
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = "That email address looks incomplete.";
  if (!v.type) e.type = "Please choose a type of event, or “Not sure yet”.";
  return e;
}

/**
 * The enquiry form. There is no backend yet (no inbox or sending domain is confirmed), so a valid
 * brief is never "sent": the visitor is told plainly, and can copy the brief to send it themselves.
 */
export function EnquiryForm() {
  const params = useSearchParams();
  const preset = params.get("type") ?? "";
  const uid = useId();
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    type: eventTypeOptions.some((o) => o.value === preset) ? preset : "",
    date: "",
    guests: "",
    city: "",
    brief: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const summary = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLDivElement>(null);

  const id = (k: string) => `${uid}-${k}`;
  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setReady(false);
  };

  const briefText = () => {
    const type = eventTypeOptions.find((o) => o.value === values.type)?.label ?? "";
    return [
      `Name: ${values.name}`,
      values.phone && `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      `Type of event: ${type}`,
      values.date && `Date: ${values.date}`,
      values.guests && `Guests: ${values.guests}`,
      values.city && `City: ${values.city}`,
      values.brief && `Brief: ${values.brief}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setReady(false);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setCopied("idle");
    setReady(true);
    requestAnimationFrame(() => status.current?.focus());
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(briefText());
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  };

  const errorList = Object.entries(errors) as [keyof Errors, string][];
  const fieldFor: Record<keyof Errors, string> = {
    name: id("name"),
    contact: id("phone"),
    phone: id("phone"),
    email: id("email"),
    type: id("type"),
    date: id("date"),
    guests: id("guests"),
    city: id("city"),
    brief: id("brief"),
  };
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={id(`${k}-err`)} className="error-text">
        {errors[k]}
      </span>
    ) : null;
  const describedBy = (...ks: (keyof Errors | string)[]) =>
    ks.filter((k) => (k.endsWith("-hint") ? true : errors[k as keyof Errors])).map((k) => (k.endsWith("-hint") ? id(k) : id(`${k}-err`))).join(" ") ||
    undefined;

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Your brief">
      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="mb-10 border-l-2 border-[#a3361f] bg-[#fbf3f1] px-5 py-4">
          <p className="font-medium">A few things need a look before this can go.</p>
          <ul className="mt-2 list-disc pl-5">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${fieldFor[k]}`} className="underline underline-offset-4">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <div className="field md:col-span-2">
          <label htmlFor={id("name")}>
            Your name <span className="muted font-normal">(required)</span>
          </label>
          <input id={id("name")} className="input" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
          {err("name")}
        </div>

        <fieldset className="field contents">
          <legend className="sr-only">How we reply: a phone number or an email is enough</legend>
          <div className="field">
            <label htmlFor={id("phone")}>Phone</label>
            <span id={id("contact-hint")} className="hint">
              A phone number or an email is enough.
            </span>
            <input
              id={id("phone")}
              className="input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={!!(errors.phone || errors.contact)}
              aria-describedby={describedBy("contact-hint", "contact", "phone")}
            />
            {err("contact")}
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor={id("email")}>Email</label>
            <span className="hint hidden md:block" aria-hidden="true">
              &nbsp;
            </span>
            <input
              id={id("email")}
              className="input"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              aria-invalid={!!(errors.email || errors.contact)}
              aria-describedby={describedBy("contact-hint", "email")}
            />
            {err("email")}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor={id("type")}>
            Type of event <span className="muted font-normal">(required)</span>
          </label>
          <select id={id("type")} className="input" value={values.type} onChange={set("type")} aria-invalid={!!errors.type} aria-describedby={describedBy("type")}>
            <option value="">Choose one</option>
            {eventTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err("type")}
        </div>

        <div className="field">
          <label htmlFor={id("date")}>Date</label>
          <span id={id("date-hint")} className="hint">
            A month or a rough date is fine.
          </span>
          <input id={id("date")} className="input" value={values.date} onChange={set("date")} aria-describedby={id("date-hint")} />
        </div>

        <div className="field">
          <label htmlFor={id("guests")}>Guests</label>
          <select id={id("guests")} className="input" value={values.guests} onChange={set("guests")}>
            <option value="">Choose a range</option>
            {guestOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={id("city")}>City</label>
          <input id={id("city")} className="input" autoComplete="address-level2" value={values.city} onChange={set("city")} />
        </div>

        <div className="field md:col-span-2">
          <label htmlFor={id("brief")}>Your event, in a few lines</label>
          <span id={id("brief-hint")} className="hint">
            What it is for, who is coming, and anything that has to be there.
          </span>
          <textarea id={id("brief")} className="input" rows={5} value={values.brief} onChange={set("brief")} aria-describedby={id("brief-hint")} />
        </div>
      </div>

      <div className="mt-10">
        <button type="submit" className="btn w-full sm:w-auto">
          Check my brief <span className="arrow" aria-hidden="true" />
        </button>
      </div>

      {ready && (
        <div ref={status} tabIndex={-1} role="status" className="mt-10 border-l-2 border-[var(--copper)] bg-[var(--linen)] px-5 py-5">
          <p className="font-medium">{planPage.notSent.heading}</p>
          <p className="mt-2">
            <Txt>{planPage.notSent.body}</Txt>
          </p>
          <button type="button" onClick={copy} className="btn btn--sm mt-5">
            Copy my brief
          </button>
          <p className="mt-3 text-[0.9375rem]" aria-live="polite">
            {copied === "done" && "Copied. Paste it into an email or a message to us."}
            {copied === "failed" && "Your browser blocked copying. Select the text in the form and copy it instead."}
          </p>
        </div>
      )}
    </form>
  );
}
