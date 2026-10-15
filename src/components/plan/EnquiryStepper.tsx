"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { enquiryForm, services } from "@/content/site";
import {
  control,
  controlBorder,
  copy,
  describedBy,
  errorClass,
  fields,
  hintClass,
  labelClass,
  Marker,
  validate,
  type Errors,
  type Values,
} from "./enquiry-shared";
import "./plan-stepper.css";

/**
 * Plan your event on phones (W9.3): one question per screen, rendered by EnquiryForm only after hydration on
 * screens under 768px (the server render is the single-page form, so it works without JS).
 *
 * - Six steps: what (service photo tiles), when, guests (pills), where, more (optional brief), reply (name +
 *   phone or email). Field names and ids match the single-page form (enquiry-name, enquiry-date, ...).
 * - A thin copper line shows progress; each step's legend starts with "Step n of 6". Next validates only the
 *   current step (inline errors with aria-invalid / aria-describedby, focus to the first problem); a valid Next
 *   moves focus to the next step's legend. Back keeps every answer. Enter in a field acts as Next.
 * - Steps slide sideways (translate, 300ms); under reduced motion they switch instantly.
 * - Tapping a tile on step 1 moves on after ~250ms. Keyboard choice (arrows / Space) never auto-advances:
 *   Enter or Next does.
 * - The last step never pretends to send: no network call, the honest "Not sent" panel
 *   (enquiryForm.status.cannotSend) and a list of the answers, each with a way back to change it.
 */

const STEPS = 6;
const SLIDE_MS = 300;
const AUTO_ADVANCE_MS = 250;

const questions = [
  "What are you planning?",
  "When?",
  "Roughly how many guests?",
  "Where?",
  "Tell us a little more",
  "How should we reply?",
] as const;

const nav = { back: "Back", next: "Next", change: "Change", review: "Your answers", notGiven: "Not given", edit: "Edit your answers" };

const serviceTiles = services.map((s) => ({ value: s.enquiryValue, label: s.shortName, image: s.heroImage }));
const notSure = copy.eventTypeOptions.find((o) => o.value === "not-sure") ?? { value: "not-sure", label: "Not sure yet" };

/** Which errors belong to a step (only steps 1 and 6 have required answers). */
function stepErrors(step: number, v: Values): Errors {
  const all = validate(v);
  if (step === 0) return all.eventType ? { eventType: all.eventType } : {};
  if (step === 5) {
    const e: Errors = {};
    if (all.name) e.name = all.name;
    if (all.contact) e.contact = all.contact;
    return e;
  }
  return {};
}

function eventTypeLabel(value: string) {
  return copy.eventTypeOptions.find((o) => o.value === value)?.label ?? "";
}

function guestsLabel(value: string) {
  return fields.guests.options.find((o) => o.value === value)?.label ?? "";
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

type Props = { values: Values; setValues: (v: Values) => void };

export function EnquiryStepper({ values, setValues }: Props) {
  const [step, setStep] = useState(0);
  const [slide, setSlide] = useState<{ from: number; dir: "next" | "prev" } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const legends = useRef<(HTMLLegendElement | null)[]>([]);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const slideTimer = useRef<number | undefined>(undefined);
  const advanceTimer = useRef<number | undefined>(undefined);
  const pointerPick = useRef(false);
  // Focus target after the next render: a step's legend, or a field id.
  const focusNext = useRef<number | string | null>(null);

  useEffect(
    () => () => {
      window.clearTimeout(slideTimer.current);
      window.clearTimeout(advanceTimer.current);
    },
    [],
  );

  useEffect(() => {
    const target = focusNext.current;
    if (target === null) return;
    focusNext.current = null;
    if (typeof target === "number") legends.current[target]?.focus();
    else formRef.current?.querySelector<HTMLElement>(`#${target}`)?.focus();
  });

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const set = (key: keyof Values, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // Errors already shown update as the visitor fixes them.
    if (Object.keys(errors).length) setErrors(stepErrors(step, next));
  };

  const goTo = (to: number) => {
    window.clearTimeout(advanceTimer.current);
    window.clearTimeout(slideTimer.current);
    if (to === step) return;
    if (!reduced) {
      setSlide({ from: step, dir: to > step ? "next" : "prev" });
      slideTimer.current = window.setTimeout(() => setSlide(null), SLIDE_MS + 20);
    } else setSlide(null);
    setErrors({});
    setStep(to);
    focusNext.current = to;
  };

  /** Validate the current step; on a problem show it and focus the first field that needs attention. */
  const check = (s: number, v: Values) => {
    const found = stepErrors(s, v);
    setErrors(found);
    if (found.eventType) focusNext.current = `enquiry-type-${v.eventType || serviceTiles[0].value}`;
    else if (found.name) focusNext.current = "enquiry-name";
    else if (found.contact) focusNext.current = found.contact === copy.errors.email ? "enquiry-email" : "enquiry-phone";
    return Object.keys(found).length === 0;
  };

  const next = () => {
    if (!check(step, values)) return;
    if (step < STEPS - 1) goTo(step + 1);
    else finish();
  };

  const finish = () => {
    // Every required answer, in case one was cleared on the way.
    const all = validate(values);
    if (all.eventType) {
      goTo(0);
      return;
    }
    // TODO(backend): the real POST goes here once an API route exists; only on a confirmed success show
    // enquiryForm.status.sent. Until then nothing is sent and no network call is made.
    setDone(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  const pickType = (value: string) => {
    set("eventType", value);
    if (!pointerPick.current) return;
    pointerPick.current = false;
    window.clearTimeout(advanceTimer.current);
    const v = { ...values, eventType: value };
    advanceTimer.current = window.setTimeout(() => {
      if (check(0, v)) goTo(1);
    }, AUTO_ADVANCE_MS);
  };

  const panel = (i: number, children: ReactNode, opts: { describe?: string } = {}) => {
    const current = i === step && !done;
    const leaving = !done && slide !== null && slide.from === i && i !== step;
    const anim = current && slide ? `in-${slide.dir}` : leaving ? `out-${slide!.dir}` : undefined;
    return (
      <fieldset
        key={i}
        className="ps-panel min-w-0"
        hidden={!current && !leaving}
        data-anim={anim}
        aria-hidden={leaving || undefined}
        inert={leaving || undefined}
        aria-describedby={opts.describe}
      >
        <legend
          ref={(el) => {
            legends.current[i] = el;
          }}
          tabIndex={-1}
          className="block w-full scroll-mt-28 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          <span className="sr-only">
            Step {i + 1} of {STEPS}
          </span>
          <span className="block font-display text-[1.75rem] leading-[1.15] font-medium text-navy">{questions[i]}</span>
        </legend>
        <div className="mt-6">{children}</div>
      </fieldset>
    );
  };

  const phoneBad = !!errors.contact && errors.contact !== copy.errors.email;
  const emailBad = !!errors.contact && errors.contact !== copy.errors.phone;

  const answers: { label: string; value: string; step: number }[] = [
    { label: fields.eventType.label, value: eventTypeLabel(values.eventType), step: 0 },
    { label: fields.date.label, value: values.date.trim(), step: 1 },
    { label: fields.guests.label, value: guestsLabel(values.guests), step: 2 },
    { label: fields.city.label, value: values.city.trim(), step: 3 },
    { label: "Brief", value: values.brief.trim(), step: 4 },
    { label: fields.name.label, value: values.name.trim(), step: 5 },
    { label: fields.phone.label, value: values.phone.trim(), step: 5 },
    { label: fields.email.label, value: values.email.trim(), step: 5 },
  ];

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="enquiry-title" className="plan-stepper">
      <h2 id="enquiry-title" className="sr-only">
        {copy.heading}
      </h2>

      {/* Progress: a thin copper line (the legend carries "Step n of 6" for everyone). */}
      <div aria-hidden="true" className="h-[2px] w-full bg-navy/10">
        <div
          className="ps-progress h-full origin-left bg-copper"
          style={{ transform: `scaleX(${done ? 1 : (step + 1) / STEPS})` }}
        />
      </div>

      <div hidden={done} className="ps-viewport relative -mx-2 mt-8 overflow-clip px-2 pt-1 pb-2">
        {panel(
          0,
          <>
            <div className="grid grid-cols-2 gap-3" onPointerDown={() => (pointerPick.current = true)} onKeyDown={() => (pointerPick.current = false)}>
              {serviceTiles.map((t) => (
                <Tile
                  key={t.value}
                  id={`enquiry-type-${t.value}`}
                  value={t.value}
                  checked={values.eventType === t.value}
                  invalid={!!errors.eventType}
                  onPick={pickType}
                >
                  <Image src={t.image.src} style={photoStyle(t.image.src)} alt="" fill sizes="45vw" className="object-cover" />
                  <span aria-hidden="true" className="ps-tile-shade absolute inset-0" />
                  <span className="absolute inset-x-3 bottom-3 text-[17px] leading-[1.2] font-medium text-white">{t.label}</span>
                </Tile>
              ))}
            </div>
            <div className="mt-3" onPointerDown={() => (pointerPick.current = true)} onKeyDown={() => (pointerPick.current = false)}>
              <Tile
                id={`enquiry-type-${notSure.value}`}
                value={notSure.value}
                checked={values.eventType === notSure.value}
                invalid={!!errors.eventType}
                onPick={pickType}
                plain
              >
                <span className="text-[16px] font-medium">{notSure.label}</span>
              </Tile>
            </div>
            {errors.eventType ? (
              <p id="enquiry-type-error" className={errorClass}>
                {errors.eventType}
              </p>
            ) : null}
          </>,
          { describe: errors.eventType ? "enquiry-type-error" : undefined },
        )}

        {panel(
          1,
          <>
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
              onChange={(e) => set("date", e.target.value)}
              className={`${control} ${controlBorder(false)} mt-2 h-12`}
            />
          </>,
        )}

        {panel(
          2,
          <>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {fields.guests.options.map((o) => (
                <label key={o.value} className="ps-pill relative flex min-h-14 cursor-pointer items-center justify-center border border-navy/25 px-3 text-[16px] font-medium text-navy has-checked:border-navy has-checked:bg-navy has-checked:text-white">
                  <input
                    type="radio"
                    id={`enquiry-guests-${o.value}`}
                    name="guests"
                    value={o.value}
                    checked={values.guests === o.value}
                    onChange={() => set("guests", o.value)}
                    className="ps-radio absolute inset-0 m-0 cursor-pointer appearance-none"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </>,
        )}

        {panel(
          3,
          <>
            <label htmlFor="enquiry-city" className={labelClass}>
              {fields.city.label}
            </label>
            <input
              id="enquiry-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
              className={`${control} ${controlBorder(false)} mt-2 h-12`}
            />
          </>,
        )}

        {panel(
          4,
          <>
            <label htmlFor="enquiry-brief" className={labelClass}>
              {fields.brief.label}
            </label>
            <textarea
              id="enquiry-brief"
              name="brief"
              rows={5}
              value={values.brief}
              onChange={(e) => set("brief", e.target.value)}
              className={`${control} ${controlBorder(false)} mt-2 min-h-36 resize-y py-3`}
            />
          </>,
        )}

        {panel(
          5,
          <div className="space-y-6">
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
                onChange={(e) => set("name", e.target.value)}
                className={`${control} ${controlBorder(!!errors.name)} mt-2 h-12`}
              />
              {errors.name ? (
                <p id="enquiry-name-error" className={errorClass}>
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <p className={labelClass}>
                {copy.contactGroup.legend} <Marker>{copy.contactGroup.marker}</Marker>
              </p>
              <p id="enquiry-contact-hint" className={hintClass}>
                {copy.contactGroup.hint}
              </p>
              <div className="mt-4 space-y-5">
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
                    onChange={(e) => set("phone", e.target.value)}
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
                    onChange={(e) => set("email", e.target.value)}
                    className={`${control} ${controlBorder(emailBad)} mt-2 h-12`}
                  />
                </div>
              </div>
              {errors.contact ? (
                <p id="enquiry-contact-error" className={errorClass}>
                  {errors.contact}
                </p>
              ) : null}
            </div>
          </div>,
        )}
      </div>

      {!done ? (
        <div className="mt-8 flex gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="t-button inline-flex min-h-12 w-[34%] items-center justify-center border border-navy/30 px-4 text-navy transition-colors active:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            >
              {nav.back}
            </button>
          ) : null}
          <button
            type="submit"
            className="btn-sweep t-button inline-flex min-h-12 flex-1 items-center justify-center bg-copper px-6 text-center text-white [--sweep:#9E5F27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            {step < STEPS - 1 ? nav.next : enquiryForm.submit}
          </button>
        </div>
      ) : null}

      {/* Honest status: always in the DOM so screen readers hear the change. */}
      <div role="status" aria-live="polite">
        {done ? (
          <div className="pm-status-in border-l-2 border-copper bg-mist px-5 py-5">
            <p ref={doneRef} tabIndex={-1} className="t-label text-copper-deep outline-none">
              {copy.status.heading}
            </p>
            <p className="mt-3 text-[16px] leading-[1.55] text-navy">{copy.status.message}</p>
          </div>
        ) : null}
      </div>

      {done ? (
        <div className="mt-8">
          <h3 className="t-label text-copper-deep">{nav.review}</h3>
          <dl className="mt-3 border-t border-navy/12">
            {answers.map((a) => (
              <div key={a.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-navy/12 py-2">
                <div className="min-w-0">
                  <dt className="text-[14px] text-navy/68">{a.label}</dt>
                  <dd className="text-[16px] leading-[1.5] break-words whitespace-pre-line text-navy">
                    {a.value || <span className="text-navy/68">{nav.notGiven}</span>}
                  </dd>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setSlide(null);
                    setErrors({});
                    setStep(a.step);
                    focusNext.current = a.step;
                  }}
                  className="inline-flex min-h-11 min-w-11 items-center justify-end text-[15px] text-copper-deep underline decoration-copper/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                >
                  {nav.change}
                  <span className="sr-only"> {a.label.toLowerCase()}</span>
                </button>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </form>
  );
}

type TileProps = {
  id: string;
  value: string;
  checked: boolean;
  invalid: boolean;
  onPick: (value: string) => void;
  plain?: boolean;
  children: ReactNode;
};

/**
 * A radio styled as a tile. The (transparent, appearance-none) input covers the whole tile, so it takes the
 * tap and draws the copper focus ring itself; the selected state is a copper frame and a tick.
 */
function Tile({ id, value, checked, invalid, onPick, plain, children }: TileProps) {
  return (
    <label
      htmlFor={id}
      className={`ps-tile relative flex cursor-pointer overflow-hidden ${
        plain
          ? "min-h-14 items-center justify-center border border-navy/25 px-4 text-navy has-checked:border-navy has-checked:bg-navy has-checked:text-white"
          : "aspect-[5/6] bg-navy"
      }`}
    >
      {children}
      {/* Copper frame + tick when chosen. */}
      <span aria-hidden="true" className="ps-tile-check">
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M1 5.5l4 4L13 1.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <input
        type="radio"
        id={id}
        name="eventType"
        value={value}
        checked={checked}
        required
        aria-invalid={invalid || undefined}
        onChange={() => onPick(value)}
        // A tap on the tile that is already chosen still moves on (no change event fires then).
        onClick={() => checked && onPick(value)}
        className="ps-radio absolute inset-0 z-10 m-0 cursor-pointer appearance-none"
      />
    </label>
  );
}
