"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/animations/Magnetic";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";
import { trackContactFormSubmit } from "@/lib/analytics";

function SuccessCheck() {
  const pathRef = useRef<SVGPathElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    if (reducedMotion || !ready) {
      path.style.strokeDashoffset = "0";
      return;
    }

    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !path) return;
      const { gsap } = getGsap();
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.55,
        ease: EASE.power2,
      });
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [ready, reducedMotion]);

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-success"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path ref={pathRef} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const fieldsRef = useRef<HTMLFormElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || reducedMotion || !fieldsRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !fieldsRef.current) return;
      const { gsap } = getGsap();
      const fields = fieldsRef.current.querySelectorAll<HTMLElement>(
        "[data-form-field]",
      );

      ctx = gsap.context(() => {
        gsap.fromTo(
          fields,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: EASE.power3,
            scrollTrigger: {
              trigger: fieldsRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }, fieldsRef);
    }

    void run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fallback?: boolean;
        mailto?: string;
      };

      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }

      if (json.fallback && json.mailto) {
        trackContactFormSubmit("fallback");
        window.location.href = json.mailto;
      } else {
        trackContactFormSubmit("success");
      }

      setStatus("success");
      setMessage(
        json.fallback
          ? "Opening your email client…"
          : "Thanks — check your inbox for a confirmation. I’ll get back to you soon.",
      );
      form.reset();
    } catch (err) {
      trackContactFormSubmit("error");
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Could not send. Please email me directly.",
      );
    }
  }

  return (
    <form
      ref={fieldsRef}
      onSubmit={onSubmit}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div data-form-field>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div data-form-field>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div data-form-field>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell me about the project, timeline, and goals…"
          rows={5}
        />
      </div>
      <div data-form-field>
        <Magnetic>
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto"
            data-cursor="hover"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            Send message
          </Button>
        </Magnetic>
      </div>
      {message ? (
        <p
          role="status"
          className={
            status === "error"
              ? "flex items-center gap-2 text-sm text-destructive"
              : "flex items-center gap-2 text-sm text-success"
          }
        >
          {status === "success" ? <SuccessCheck /> : null}
          {message}
        </p>
      ) : null}
    </form>
  );
}
