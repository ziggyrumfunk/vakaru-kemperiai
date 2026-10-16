"use client";
import { useEffect } from "react";

/**
 * One observer for the whole site. Any element with data-reveal gets data-in once it
 * scrolls into view; the CSS in globals.css does the animating. Elements that also
 * carry data-gate wait until the intro loader has finished.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-ready", ""); // tells the boot script in layout.tsx that JS is running
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const waiting = new Set<Element>();
    const show = (el: Element) => el.setAttribute("data-in", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          if (entry.target.hasAttribute("data-gate") && !root.hasAttribute("data-loaded")) waiting.add(entry.target);
          else show(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    const watch = (el: Element) => {
      if (el.hasAttribute("data-in")) return;
      if (reduce) show(el);
      else io.observe(el);
    };
    const scan = (node: ParentNode) => node.querySelectorAll("[data-reveal]").forEach(watch);
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.hasAttribute("data-reveal")) watch(n);
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onLoaded = () => {
      waiting.forEach(show);
      waiting.clear();
    };
    window.addEventListener("vk:loaded", onLoaded);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("vk:loaded", onLoaded);
    };
  }, []);

  return null;
}
