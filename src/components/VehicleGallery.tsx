"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { getLenis } from "./SmoothScroll";
import { ArrowLeft, ArrowRight, Close, Expand } from "./Icons";

export default function VehicleGallery({ images, name }: { images: string[]; name: string }) {
  const t = useTranslations("ui");
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const n = images.length;

  const step = useCallback((d: number) => setIndex((i) => (i + d + n) % n), [n]);
  const openAt = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    getLenis()?.stop();
  };

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => getLenis()?.start();
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  if (n === 0) return <div className="aspect-[16/10] bg-paper-3" />;

  const tile = (i: number, className: string, sizes: string, priority = false) => (
    <button
      type="button"
      onClick={() => openAt(i)}
      className={`group relative overflow-hidden bg-paper-3 ${className}`}
      aria-label={t("photoOf", { n: i + 1, total: n })}
    >
      <Image
        src={images[i]}
        alt={i === 0 ? name : ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]"
      />
    </button>
  );

  return (
    <>
      {/* phones: swipe through every photo */}
      <div className="rail no-scrollbar -mx-[var(--gutter)] gap-2 md:hidden" style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}>
        {images.map((_, i) => (
          <div key={i} className="w-[86vw] shrink-0">
            {tile(i, "block aspect-[4/3] w-full", "86vw", i === 0)}
          </div>
        ))}
      </div>

      {/* larger screens: one large photo and two smaller ones */}
      <div className={`relative hidden gap-2 md:grid md:h-[min(68vh,44rem)] ${n >= 3 ? "md:grid-cols-12 md:grid-rows-2" : n === 2 ? "md:grid-cols-2" : ""}`}>
        {tile(0, n >= 3 ? "md:col-span-8 md:row-span-2" : "", "(max-width: 1024px) 66vw, 60vw", true)}
        {n >= 2 && tile(1, n >= 3 ? "md:col-span-4" : "", "33vw")}
        {n >= 3 && tile(2, "md:col-span-4", "33vw")}
        {n > 1 && (
          <button
            type="button"
            onClick={() => openAt(0)}
            className="btn btn-light btn-sm absolute bottom-4 right-4 shadow-[0_10px_30px_-12px_rgb(20_20_18/0.45)]"
          >
            <Expand size={16} /> {t("allPhotos")} ({n})
          </button>
        )}
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={name}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div
          className="grid h-full grid-rows-[auto_1fr_auto]"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="truncate text-[0.9375rem]">
              <span className="font-medium">{name}</span>
              <span className="text-muted-dark"> · {index + 1} / {n}</span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              className="btn-icon border-line-dark hover:border-paper"
              aria-label={t("close")}
            >
              <Close />
            </button>
          </div>
          <div className="relative mx-2 sm:mx-6">
            <Image key={images[index]} src={images[index]} alt={t("photoOf", { n: index + 1, total: n })} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-4">
            <button type="button" onClick={() => step(-1)} className="btn-icon border-line-dark hover:border-paper" aria-label={t("prev")}>
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => step(1)} className="btn-icon border-line-dark hover:border-paper" aria-label={t("next")}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
