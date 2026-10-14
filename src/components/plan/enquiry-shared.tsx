import type { ReactNode } from "react";
import { planPage } from "@/content/pages";
import { enquiryForm, type ServiceSlug } from "@/content/site";

/** Shared pieces of the Plan your event form: the single-page form (EnquiryForm) and the phone stepper (EnquiryStepper). */

export const fields = enquiryForm.fields;
export const copy = planPage.form;

export type Values = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  city: string;
  brief: string;
};

export type ErrorKey = "name" | "contact" | "eventType";
export type Errors = Partial<Record<ErrorKey, string>>;

const SERVICE_SLUGS: ServiceSlug[] = ["weddings", "celebrations", "brand-launches", "corporate-dining"];

/** Returns the slug if `value` is one of the four services, otherwise "". */
export function presetFrom(value: string | null | undefined): ServiceSlug | "" {
  return SERVICE_SLUGS.includes(value as ServiceSlug) ? (value as ServiceSlug) : "";
}

export function emptyValues(preset: ServiceSlug | "" = ""): Values {
  return { name: "", phone: "", email: "", eventType: preset, date: "", guests: "", city: "", brief: "" };
}

export function validate(v: Values): Errors {
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
export const control =
  "block w-full rounded-none border bg-white px-4 text-[16px] leading-[1.4] text-navy outline-none transition-colors focus:border-copper focus:outline-2 focus:outline-offset-0 focus:outline-copper";
export const controlBorder = (invalid: boolean) => (invalid ? "border-[#9e2a1e]" : "border-navy/30");
export const labelClass = "flex flex-wrap items-baseline gap-x-3 text-[15px] leading-[1.4] font-medium text-navy";
export const hintClass = "mt-1 text-[14px] leading-[1.45] text-navy/68";
export const errorClass = "mt-2 text-[14px] leading-[1.45] font-medium text-[#9e2a1e]";

export function Marker({ children }: { children: ReactNode }) {
  return <span className="text-[12px] font-medium tracking-[0.12em] text-copper-deep uppercase">{children}</span>;
}

/** ids for the hint and error lines of a field, joined for aria-describedby. */
export function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean).join(" ");
  return list || undefined;
}
