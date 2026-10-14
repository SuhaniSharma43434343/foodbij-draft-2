"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm, presetFrom } from "./EnquiryForm";

/**
 * Reads `?service=<slug>` and preselects that service in the form. Render inside <Suspense>
 * (useSearchParams); the fallback is the same form without a preset.
 */
export function PresetEnquiryForm() {
  const preset = presetFrom(useSearchParams().get("service"));
  return <EnquiryForm key={preset} preset={preset} />;
}
