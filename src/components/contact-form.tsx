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

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>Name</span>
          <input name="name" value={form.name} onChange={onChange} />
          {hasSubmitted && errors.name ? (
            <small className="field-error">{errors.name}</small>
          ) : null}
        </label>
        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />
          {hasSubmitted && errors.email ? (
            <small className="field-error">{errors.email}</small>
          ) : null}
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={6} value={form.message} onChange={onChange} />
        {hasSubmitted && errors.message ? (
          <small className="field-error">{errors.message}</small>
        ) : null}
      </label>
      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isPending}>
          {isPending ? "Sending..." : "Send message"}
        </button>
        {status ? (
          <p className={`form-status form-status-${status.tone}`}>{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}
