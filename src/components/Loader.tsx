"use client";
import { useEffect, useState } from "react";

function markLoaded() {
  const root = document.documentElement;
  if (root.hasAttribute("data-loaded")) return;
  root.setAttribute("data-loaded", "");
  try {
    sessionStorage.setItem("vk_loaded", "1");
  } catch {}
  window.dispatchEvent(new Event("vk:loaded"));
}

/** First visit of a session only: logo on ink, then the panel lifts away. */
export default function Loader() {
  const [stage, setStage] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    // returning visitors: CSS already hides the loader (html[data-seen])
    if (document.documentElement.hasAttribute("data-seen")) {
      markLoaded();
      return;
    }
    const timers = [
      window.setTimeout(() => setStage("leave"), 1150),
      window.setTimeout(markLoaded, 1450),
      window.setTimeout(() => setStage("gone"), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === "gone") return null;
  return (
    <div className={`loader ${stage === "leave" ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="loader-logo" />
        <div className="loader-bar"><span /></div>
      </div>
    </div>
  );
}
