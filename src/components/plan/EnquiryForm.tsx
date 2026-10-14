"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { planPage } from "@/content/pages";
import { enquiryForm, type ServiceSlug } from "@/content/site";

const { fields } = enquiryForm;
const copy = planPage.form;

type Values = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  city: string;
  brief: string;
};

type ErrorKey = "name" | "contact" | "eventType";
type Errors = Partial<Record<ErrorKey, string>>;

const SERVICE_SLUGS: ServiceSlug[] = ["weddings", "celebrations", "brand-launches", "corporate-dining"];

/** Returns the slug if `value` is one of the four services, otherwise "". */
export function presetFrom(value: string | null | undefined): ServiceSlug | "" {
  return SERVICE_SLUGS.includes(value as ServiceSlug) ? (value as ServiceSlug) : "";
}

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = copy.errors.name;
  const phone = v.phone.trim();
  const email = v.email.trim();
  if (!phone && !email) errors.contact = copy.errors.contact;
  else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.contact = copy.errors.email;
  else if (phone && phone.replace(/\D/g, "").length < 7) errors.contact = copy.errors.phone;
  if (!v.eventType) errors.eventType = copy.errors.eventType;
  return errors;
}

// Shared control styles: 16px text (no iOS zoom), 48px tall, square corners, 1px navy/30 border,
// copper focus ring.
const control =
  "block w-full rounded-none border bg-white px-4 text-[16px] leading-[1.4] text-navy outline-none transition-colors focus:border-copper focus:outline-2 focus:outline-offset-0 focus:outline-copper";
const controlBorder = (invalid: boolean) => (invalid ? "border-[#9e2a1e]" : "border-navy/30");
const labelClass = "flex flex-wrap items-baseline gap-x-3 text-[15px] leading-[1.4] font-medium text-navy";
const hintClass = "mt-1 text-[14px] leading-[1.45] text-navy/68";
const errorClass = "mt-2 text-[14px] leading-[1.45] font-medium text-[#9e2a1e]";

function Marker({ children }: { children: ReactNode }) {
  return <span className="text-[12px] font-medium tracking-[0.12em] text-copper-deep uppercase">{children}</span>;
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-navy"
    >
      <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/** ids for the hint and error lines of a field, joined for aria-describedby. */
function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}

type EnquiryFormProps = {
  /** Service slug from `?service=`, preselected in "Type of event". */
  preset?: ServiceSlug | "";
};

/**
 * The Plan your event form. There is no backend yet, so submitting never pretends to send: a valid
 * submit shows an honest "cannot send" panel with the phone and email, and keeps what was typed.
 */
export function EnquiryForm({ preset = "" }: EnquiryFormProps) {
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    eventType: preset,
    date: "",
    guests: "",
    city: "",
    brief: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    setShowStatus(false);
    // After a first submit, errors update as the visitor fixes them.
    if (triedSubmit) setErrors(validate(next));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedSubmit(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowStatus(false);
      // Move focus to the first field that needs attention.
      const first = (["name", "contact", "eventType"] as ErrorKey[]).find((k) => found[k]);
      const target =
        first === "name" ? "enquiry-name" : first === "eventType" ? "enquiry-type" : found.contact === copy.errors.email ? "enquiry-email" : "enquiry-phone";
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`#${target}`)?.focus());
      return;
    }

    // TODO(backend): this is where the real POST goes once an API route exists, e.g.
    //   const res = await fetch("/api/enquiry", { method: "POST", body: JSON.stringify(values) });
    // and only on a confirmed success show enquiryForm.status.sent. Until then nothing is sent and
    // no network call is made: the visitor is told plainly and shown how to reach Foodbiz.
    setShowStatus(true);
    requestAnimationFrame(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  const errorCount = Object.keys(errors).length;
  // Which of the two reply fields the contact error is about (both when neither is filled in).
  const phoneBad = !!errors.contact && errors.contact !== copy.errors.email;
  const emailBad = !!errors.contact && errors.contact !== copy.errors.phone;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="enquiry-title" className="space-y-7">
      <h2 id="enquiry-title" className="sr-only">
        {copy.heading}
      </h2>

      {/* Name */}
      <div>
        <label htmlFor="enquiry-name" className={labelClass}>
          {fields.name.label} <Marker>{copy.requiredWord}</Marker>
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy(errors.name && "enquiry-name-error")}
          value={values.name}
          onChange={set("name")}
          className={`${control} ${controlBorder(!!errors.name)} mt-2 h-12`}
        />
        {errors.name ? (
          <p id="enquiry-name-error" className={errorClass}>
            {errors.name}
          </p>
        ) : null}
      </div>

      {/* Phone or email: at least one */}
      <fieldset>
        <legend className={labelClass}>
          {copy.contactGroup.legend} <Marker>{copy.contactGroup.marker}</Marker>
        </legend>
        <p id="enquiry-contact-hint" className={hintClass}>
          {copy.contactGroup.hint}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="enquiry-phone" className={labelClass}>
              {fields.phone.label}
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={phoneBad || undefined}
              aria-describedby={describedBy("enquiry-contact-hint", errors.contact && "enquiry-contact-error")}
              value={values.phone}
              onChange={set("phone")}
              className={`${control} ${controlBorder(phoneBad)} mt-2 h-12`}
            />
          </div>
          <div>
            <label htmlFor="enquiry-email" className={labelClass}>
              {fields.email.label}
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={emailBad || undefined}
              aria-describedby={describedBy("enquiry-contact-hint", errors.contact && "enquiry-contact-error")}
              value={values.email}
              onChange={set("email")}
              className={`${control} ${controlBorder(emailBad)} mt-2 h-12`}
            />
          </div>
        </div>
        {errors.contact ? (
          <p id="enquiry-contact-error" className={errorClass}>
            {errors.contact}
          </p>
        ) : null}
      </fieldset>

      {/* Type of event */}
      <div>
        <label htmlFor="enquiry-type" className={labelClass}>
          {fields.eventType.label} <Marker>{copy.requiredWord}</Marker>
        </label>
        <div className="relative mt-2">
          <select
            id="enquiry-type"
            name="eventType"
            required
            aria-invalid={errors.eventType ? true : undefined}
            aria-describedby={describedBy(errors.eventType && "enquiry-type-error")}
            value={values.eventType}
            onChange={set("eventType")}
            className={`${control} ${controlBorder(!!errors.eventType)} h-12 appearance-none pr-11`}
          >
            <option value="" disabled>
              {copy.eventTypePlaceholder}
            </option>
            {copy.eventTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
        {errors.eventType ? (
          <p id="enquiry-type-error" className={errorClass}>
            {errors.eventType}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-5">
        {/* Date */}
        <div>
          <label htmlFor="enquiry-date" className={labelClass}>
            {fields.date.label}
          </label>
          <p id="enquiry-date-hint" className={hintClass}>
            {fields.date.hint}
          </p>
          <input
            id="enquiry-date"
            name="date"
            type="text"
            autoComplete="off"
            aria-describedby="enquiry-date-hint"
            value={values.date}
            onChange={set("date")}
            className={`${control} ${controlBorder(false)} mt-2 h-12`}
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="enquiry-guests" className={labelClass}>
            {fields.guests.label}
          </label>
          <p id="enquiry-guests-hint" className={hintClass}>
            {fields.guests.hint}
          </p>
          <div className="relative mt-2">
            <select
              id="enquiry-guests"
              name="guests"
              aria-describedby="enquiry-guests-hint"
              value={values.guests}
              onChange={set("guests")}
              className={`${control} ${controlBorder(false)} h-12 appearance-none pr-11`}
            >
              <option value="">{copy.guestsPlaceholder}</option>
              {fields.guests.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      {/* City */}
      <div>
        <label htmlFor="enquiry-city" className={labelClass}>
          {fields.city.label}
        </label>
        <p id="enquiry-city-hint" className={hintClass}>
          {fields.city.hint}
        </p>
        <input
          id="enquiry-city"
          name="city"
          type="text"
          autoComplete="address-level2"
          aria-describedby="enquiry-city-hint"
          value={values.city}
          onChange={set("city")}
          className={`${control} ${controlBorder(false)} mt-2 h-12`}
        />
      </div>

      {/* Brief */}
      <div>
        <label htmlFor="enquiry-brief" className={labelClass}>
          {fields.brief.label}
        </label>
        <p id="enquiry-brief-hint" className={hintClass}>
          {fields.brief.hint}
        </p>
        <textarea
          id="enquiry-brief"
          name="brief"
          rows={5}
          aria-describedby="enquiry-brief-hint"
          value={values.brief}
          onChange={set("brief")}
          className={`${control} ${controlBorder(false)} mt-2 min-h-36 resize-y py-3`}
        />
      </div>

      <div>
        {triedSubmit && errorCount > 0 ? (
          <p className={`${errorClass} mt-0 mb-4`} role="alert">
            {copy.errors.summary}
          </p>
        ) : null}
        <button
          type="submit"
          className="t-button inline-flex min-h-12 w-full items-center justify-center bg-copper px-7 text-center text-white transition-colors duration-200 hover:bg-copper-deep md:w-auto"
        >
          {enquiryForm.submit}
        </button>
      </div>

      {/* Honest status: always in the DOM so screen readers hear the change. */}
      <div ref={statusRef} role="status" aria-live="polite" className="scroll-mb-24">
        {showStatus ? (
          <div className="border-l-2 border-copper bg-mist px-5 py-5 lg:px-6">
            <p className="t-label text-copper-deep">{copy.status.heading}</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-navy">{copy.status.message}</p>
            <p className="mt-2 text-[15px] leading-[1.5] text-navy/72">{copy.status.kept}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
