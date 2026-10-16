"use client";
import { useEffect, useState } from "react";
import { Mail, Phone } from "./Icons";
import { CONTACT } from "@/lib/contact";

/** Phones only: call and email stay within thumb reach on a vehicle page. Steps aside for the footer. */
export default function MobileEnquiryBar({ mailHref, callLabel, emailLabel }: { mailHref: string; callLabel: string; emailLabel: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-footer]");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-[var(--gutter)] py-3 backdrop-blur-md transition-transform duration-500 ease-out-expo lg:hidden ${
          hidden ? "translate-y-full" : ""
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-2 gap-2">
          <a href={CONTACT.phoneHref} className="btn btn-outline btn-sm">
            <Phone size={16} /> {callLabel}
          </a>
          <a href={mailHref} className="btn btn-primary btn-sm">
            <Mail size={16} /> {emailLabel}
          </a>
        </div>
      </div>
    </>
  );
}
