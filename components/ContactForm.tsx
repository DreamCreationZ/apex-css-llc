"use client";

import { FormEvent, useState } from "react";

const inquiryTypes = [
  "Federal opportunity",
  "Teaming / subcontracting",
  "IT & cloud services",
  "Cybersecurity services",
  "Professional staffing",
  "Facility services",
  "General inquiry",
] as const;

type FormStatus = { state: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm({ defaultInquiry = "Federal opportunity", heading = "Tell us about the requirement." }: { defaultInquiry?: (typeof inquiryTypes)[number]; heading?: string }) {
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ state: "sending", message: "Submitting your inquiry…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          inquiryType: formData.get("inquiryType"),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "The inquiry could not be submitted.");
      setStatus({ state: "success", message: result.message || "Your inquiry has been received." });
      form.reset();
      setStartedAt(Date.now());
    } catch (error) {
      setStatus({ state: "error", message: error instanceof Error ? error.message : "The inquiry could not be submitted." });
    }
  }

  const fieldClass = "mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-sm text-navy-950 outline-none transition placeholder:text-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20";

  return (
    <form className="bg-white p-6 shadow-[0_20px_70px_rgba(6,27,61,.12)] sm:p-10" onSubmit={handleSubmit} noValidate>
      <h2 className="font-display text-3xl font-semibold text-navy-950">{heading}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">Fields marked with an asterisk are required.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-bold text-navy-950">Name *
          <input className={fieldClass} name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </label>
        <label className="text-sm font-bold text-navy-950">Company / agency *
          <input className={fieldClass} name="company" type="text" autoComplete="organization" minLength={2} maxLength={150} required />
        </label>
        <label className="text-sm font-bold text-navy-950">Business email *
          <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label className="text-sm font-bold text-navy-950">Inquiry type *
          <select className={fieldClass} name="inquiryType" defaultValue={defaultInquiry} required>
            {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
      </div>

      <label className="mt-6 block text-sm font-bold text-navy-950">Message *
        <textarea className={`${fieldClass} min-h-40 resize-y`} name="message" minLength={20} maxLength={4000} required />
      </label>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button className="button-gold min-w-44 px-7 py-4 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Submitting…" : "Submit inquiry"}
        </button>
        <p className="max-w-md text-xs leading-5 text-slate-500">Protected by server-side validation, timing checks, a honeypot, origin checks, and request throttling.</p>
      </div>

      {status.message && (
        <div className={`mt-6 border-l-4 p-4 text-sm ${status.state === "success" ? "border-emerald-600 bg-emerald-50 text-emerald-900" : status.state === "error" ? "border-red-600 bg-red-50 text-red-900" : "border-gold-500 bg-amber-50 text-amber-900"}`} role="status" aria-live="polite">
          {status.message}
        </div>
      )}
    </form>
  );
}
