"use client";

import Image from "next/image";
import { photoStyle } from "@/components/media/photo-bg";
import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import type { Service } from "@/content/site";

export type CursorPreviewHandle = {
  show: (i: number, x: number, y: number) => void;
  move: (x: number, y: number) => void;
  hide: () => void;
};

const W = 240;
const H = 300;
const LERP = 0.15;

/**
 * A small photo of the hovered service that trails the cursor (rAF lerp, transform only) and fades in/out.
 * Decorative: aria-hidden. Works only on fine pointers with motion allowed (CSS keeps it display:none
 * elsewhere, and the handle ignores calls).
 */
export function CursorPreview({ items, ref }: { items: Service[]; ref?: Ref<CursorPreviewHandle> }) {
  const el = useRef<HTMLDivElement>(null);
  const s = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, on: false, enabled: false });

  useEffect(() => {
    const st = s.current;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => (st.enabled = mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      cancelAnimationFrame(st.raf);
    };
  }, []);

  useImperativeHandle(ref, () => {
    const st = s.current;
    const place = () => {
      if (el.current) el.current.style.transform = `translate3d(${st.x.toFixed(1)}px, ${st.y.toFixed(1)}px, 0)`;
    };
    const frame = () => {
      st.raf = 0;
      st.x += (st.tx - st.x) * LERP;
      st.y += (st.ty - st.y) * LERP;
      place();
      if (Math.abs(st.tx - st.x) > 0.3 || Math.abs(st.ty - st.y) > 0.3) st.raf = requestAnimationFrame(frame);
    };
    const target = (x: number, y: number) => {
      // Sit to the right of the pointer, vertically centred on it.
      st.tx = x + 28;
      st.ty = y - H / 2;
    };
    return {
      show(i, x, y) {
        if (!st.enabled || !el.current) return;
        target(x, y);
        if (!st.on) {
          st.x = st.tx;
          st.y = st.ty;
          place();
        }
        st.on = true;
        el.current.dataset.i = String(i);
        el.current.dataset.show = "";
      },
      move(x, y) {
        if (!st.enabled || !st.on) return;
        target(x, y);
        if (!st.raf) st.raf = requestAnimationFrame(frame);
      },
      hide() {
        st.on = false;
        if (el.current) delete el.current.dataset.show;
      },
    };
  }, []);

  return (
    <div ref={el} className="svc-preview" aria-hidden="true" style={{ width: W, height: H }}>
      {items.map((it) => (
        <div key={it.slug} className="svc-preview-img">
          <Image src={it.heroImage.src} style={photoStyle(it.heroImage.src)} alt="" fill sizes={`${W}px`} className="object-cover" />
        </div>
      ))}
    </div>
  );
}
