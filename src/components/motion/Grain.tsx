/**
 * Film grain over navy bands (W9.4) - retired in W10.1. The owner read the static noise as "scratches",
 * so this renders nothing. The component stays so existing <Grain /> call sites keep compiling; delete
 * the call sites and this file together in a later cleanup if the texture is never coming back.
 */
export function Grain(props: { className?: string }) {
  void props;
  return null;
}
