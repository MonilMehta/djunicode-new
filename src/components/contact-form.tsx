"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState, useTransition } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormStatus = {
  tone: "error" | "success";
  message: string;
} | null;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length > 50) {
    errors.name = "Name must be 50 characters or fewer.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length > 500) {
    errors.message = "Message must be 500 characters or fewer.";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState(initialValues);
  const [status, setStatus] = useState<FormStatus>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const errors = useMemo(() => validate(form), [form]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value } as FormValues));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(errors).length) {
      setStatus({
        tone: "error",
        message: "Fix the highlighted fields before sending the message.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            payload.error || "Unable to send the message right now."
          );
        }

        setForm(initialValues);
        setHasSubmitted(false);
        setStatus({
          tone: "success",
          message: payload.message || "Message sent successfully.",
        });
      } catch (error) {
        setStatus({
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to send the message right now.",
        });
      }
    });
  };

  const DISPLAY_SANS = "'Satoshi','Inter',system-ui,sans-serif";

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Name */}
        <label className="flex flex-col gap-2">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Name
          </span>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your name"
            className="w-full px-5 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all duration-200"
            style={{ fontFamily: DISPLAY_SANS, fontSize: "15px" }}
          />
          {hasSubmitted && errors.name ? (
            <small className="text-[#e05b5b] text-xs mt-0.5">{errors.name}</small>
          ) : null}
        </label>

        {/* Email */}
        <label className="flex flex-col gap-2">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-white/40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Email
          </span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="your@email.com"
            className="w-full px-5 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all duration-200"
            style={{ fontFamily: DISPLAY_SANS, fontSize: "15px" }}
          />
          {hasSubmitted && errors.email ? (
            <small className="text-[#e05b5b] text-xs mt-0.5">{errors.email}</small>
          ) : null}
        </label>
      </div>

      {/* Message */}
      <label className="flex flex-col gap-2">
        <span
          className="text-[11px] uppercase tracking-[0.18em] text-white/40"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          placeholder="What's on your mind?"
          className="w-full px-5 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all duration-200 resize-none"
          style={{ fontFamily: DISPLAY_SANS, fontSize: "15px" }}
        />
        {hasSubmitted && errors.message ? (
          <small className="text-[#e05b5b] text-xs mt-0.5">{errors.message}</small>
        ) : null}
      </label>

      {/* Submit row */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] px-8 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: DISPLAY_SANS }}
        >
          <span className="relative flex items-center gap-2.5 text-white/90 group-hover:text-white transition-colors text-[15px] font-medium">
            {isPending ? "Sending…" : "Send message"}
            {!isPending && (
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </span>
        </button>

        {status ? (
          <p
            className={`text-[13px] px-4 py-2 rounded-full ${
              status.tone === "success"
                ? "text-[#77CE90] bg-[#77CE90]/10 border border-[#77CE90]/15"
                : "text-[#e05b5b] bg-[#e05b5b]/10 border border-[#e05b5b]/15"
            }`}
            style={{ fontFamily: DISPLAY_SANS }}
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
