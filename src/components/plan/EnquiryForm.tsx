"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { enquiryForm, type ServiceSlug } from "@/content/site";
import { EnquiryStepper } from "./EnquiryStepper";
import {
  control,
  controlBorder,
  copy,
  describedBy,
  emptyValues,
  errorClass,
  fields,
  hintClass,
  labelClass,
  Marker,
  validate,
  type ErrorKey,
  type Errors,
  type Values,
} from "./enquiry-shared";

export { presetFrom } from "./enquiry-shared";

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

/**
 * Field reveal (W8.3, CSS .pm-fields in components/work/pages-motion.css). Calm and short: ~480ms in all.
 * - Desktop: the form is in the first screen, so the cascade runs in CSS on first paint.
 * - Phone: only the fields still below the fold at mount are held back (data-wait; off screen, so nothing
 *   visible blinks) and they rise in as the form scrolls into view. Focus inside the form shows every field at
 *   once, so typing never waits on the animation.
 * - Once per visit: a later mount (the Suspense swap that applies ?service=, or coming back) renders static,
 *   so the cascade never replays. Under reduced motion nothing moves.
 */
let fieldsPhase: "init" | "done" = "init";

function useFieldReveal(formRef: React.RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form || fieldsPhase === "done") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vh = window.innerHeight;
    const wait = Array.from(form.children).filter((c) => c.getBoundingClientRect().top > vh - 24);
    if (reduced || window.matchMedia("(min-width: 1024px)").matches || wait.length === 0) {
      fieldsPhase = "done";
      return;
    }
    wait.forEach((c) => c.setAttribute("data-wait", ""));
    form.dataset.fields = "pending";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        form.dataset.fields = "in";
        fieldsPhase = "done";
        io.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(wait[0]);
    return () => {
      io.disconnect();
      // Unmounted before it was seen: leave the fields visible.
      if (form.dataset.fields === "pending") {
        delete form.dataset.fields;
        wait.forEach((c) => c.removeAttribute("data-wait"));
      }
    };
  }, [formRef]);
}

type EnquiryFormProps = {
  /** Service slug from `?service=`, preselected in "Type of event". */
  preset?: ServiceSlug | "";
};

// Phones (< 768px) get the step-by-step form once hydrated. The server render and the first client render use the
// single-page form (getServerSnapshot = false), so without JS the whole form is there and works.
const PHONE_QUERY = "(max-width: 767.98px)";
function subscribePhone(cb: () => void) {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function usePhoneStepper() {
  return useSyncExternalStore(
    subscribePhone,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

/**
 * The Plan your event form. There is no backend yet, so submitting never pretends to send: a valid
 * submit shows an honest "cannot send" panel with the phone and email, and keeps what was typed.
 * Desktop/tablet (and no JS): one page with every field. Phones: one question per screen (EnquiryStepper).
 * The answers live here, so they survive a switch between the two (e.g. rotating a tablet).
 */
export function EnquiryForm({ preset = "" }: EnquiryFormProps) {
  const [values, setValues] = useState<Values>(() => emptyValues(preset));
  const phone = usePhoneStepper();
  return phone ? (
    <EnquiryStepper values={values} setValues={setValues} />
  ) : (
    <FullEnquiryForm values={values} setValues={setValues} />
  );
}

type FormStateProps = { values: Values; setValues: (v: Values) => void };

function FullEnquiryForm({ values, setValues }: FormStateProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // A form mounted after the first one has been revealed renders static (see useFieldReveal).
  const [fieldsStatic] = useState(() => fieldsPhase === "done");
  useFieldReveal(formRef);

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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => statusRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }));
  };

  const errorCount = Object.keys(errors).length;
  // Which of the two reply fields the contact error is about (both when neither is filled in).
  const phoneBad = !!errors.contact && errors.contact !== copy.errors.email;
  const emailBad = !!errors.contact && errors.contact !== copy.errors.phone;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="enquiry-title"
      data-fields={fieldsStatic ? "static" : undefined}
      className="pm-fields space-y-7"
    >
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
          <div className="relative mt-2">
            <select
              id="enquiry-guests"
              name="guests"
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
        <input
          id="enquiry-city"
          name="city"
          type="text"
          autoComplete="address-level2"
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
        <textarea
          id="enquiry-brief"
          name="brief"
          rows={5}
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
        {/* Same structure and feedback as the shared solid ButtonLink: the button keeps its box, hit area and focus
            outline; the inner face carries the copper fill with the darker sweep and leans toward the pointer on
            desktop (data-magnetic, handled by the shared useMagnetic). */}
        <button
          type="submit"
          data-magnetic=""
          className="btn-magnetic t-button inline-flex min-h-12 w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper md:w-auto"
        >
          <span
            data-magnetic-face=""
            className="btn-sweep btn-face flex min-h-12 w-full items-center justify-center bg-copper px-7 text-center text-white [--sweep:#9E5F27]"
          >
            {enquiryForm.submit}
          </span>
        </button>
      </div>

      {/* Honest status: always in the DOM so screen readers hear the change. */}
      <div ref={statusRef} role="status" aria-live="polite" className="scroll-mb-24">
        {showStatus ? (
          <div className="pm-status-in border-l-2 border-copper bg-mist px-5 py-5 lg:px-6">
            <p className="t-label text-copper-deep">{copy.status.heading}</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-navy">{copy.status.message}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
