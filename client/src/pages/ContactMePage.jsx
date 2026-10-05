import React, { useId, useState } from "react";
import { FiArrowUpRight, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../utils/api";

const emptyForm = { name: "", email: "", tel: "", message: "" };

const ContactMePage = ({ embedded = false }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSending, setIsSending] = useState(false);
  const formId = useId();
  const Heading = embedded ? "h2" : "h1";

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.tel.trim()) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Message sent successfully!");
        setFormData(emptyForm);
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-600 bg-slate-950/50 px-4 py-3 text-base text-white placeholder-slate-500 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20";

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className={`mx-auto w-full max-w-6xl text-slate-100 ${embedded ? "" : "px-4 py-8 sm:px-6 sm:py-12"}`}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <Heading
              id={`${formId}-heading`}
              className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Contact
            </Heading>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
              For work inquiries or questions about my projects, email me
              directly or use the form.
            </p>

            <div className="mt-8 space-y-5">
              <a
                href="mailto:jenka.katz@gmail.com"
                className="group flex items-center gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                  <FiMail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-100 transition group-hover:text-blue-300 sm:text-base">
                    jenka.katz@gmail.com
                  </p>
                </div>
                <FiArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              </a>
              <a
                href="tel:+972585599171"
                className="group flex items-center gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                  <FiPhone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="mt-1 text-sm font-medium text-slate-100 transition group-hover:text-blue-300 sm:text-base">
                    +972 58 559 9171
                  </p>
                </div>
                <FiArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              </a>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                  <FiMapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">Based in</p>
                  <p className="mt-1 text-sm font-medium text-slate-100 sm:text-base">Holon, Israel</p>
                </div>
              </div>
            </div>

            <a
              href="https://linkedin.com/in/jenya-proviz-katz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-blue-300 transition hover:text-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <FiLinkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
              <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <form
            className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
            onSubmit={handleSubmit}
            aria-labelledby={`${formId}-form-heading`}
            aria-busy={isSending}
          >
            <h2 id={`${formId}-form-heading`} className="text-xl font-semibold text-white">Send a message</h2>
            <p className="mt-2 text-sm text-slate-400">Fields marked with * are required.</p>
            <fieldset disabled={isSending} className="mt-6 space-y-5 disabled:opacity-70">
              <div>
                <label htmlFor={`${formId}-name`} className="text-sm font-medium text-slate-300">Full name *</label>
                <input
                  type="text" name="name" id={`${formId}-name`}
                  autoComplete="name" required placeholder="Your name"
                  value={formData.name} onChange={handleChange} className={inputClassName}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor={`${formId}-email`} className="text-sm font-medium text-slate-300">Email *</label>
                  <input
                    type="email" name="email" id={`${formId}-email`}
                    autoComplete="email" required placeholder="you@example.com"
                    value={formData.email} onChange={handleChange} className={inputClassName}
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor={`${formId}-tel`} className="text-sm font-medium text-slate-300">Phone *</label>
                  <input
                    type="tel" name="tel" id={`${formId}-tel`}
                    autoComplete="tel" required placeholder="+972 ..."
                    value={formData.tel} onChange={handleChange} className={inputClassName}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${formId}-message`} className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  name="message" id={`${formId}-message`} rows={4}
                  placeholder="Your message"
                  value={formData.message} onChange={handleChange}
                  className={`${inputClassName} resize-y`}
                />
              </div>
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-wait"
              >
                <FiSend className="h-4 w-4" aria-hidden="true" />
                {isSending ? "Sending..." : "Send message"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      {!embedded && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90">
          <div className="flex items-center gap-2 px-6 py-4 text-sm text-slate-300">
            <FiMapPin className="h-4 w-4 text-blue-300" aria-hidden="true" />
            Holon, Israel
          </div>
          <iframe
            title="Location map of Holon, Israel"
            src="https://maps.google.com/maps?q=Holon%2C%20Israel&z=12&output=embed"
            className="h-56 w-full border-0 sm:h-64"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default ContactMePage;
