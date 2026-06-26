"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, Globe, Download } from "lucide-react";
import ProfileCardGrid from "@/components/ui/info-card";

// Contact Form component
function ContactFormSection({
  title,
  description,
  email,
  web,
}: {
  title: string;
  description: string;
  email: string;
  web: { label: string; url: string };
}) {
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setFormStatus("idle");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!key || key === "your_access_key_here") {
      setIsSending(false);
      setFormStatus("error");
      setErrorMsg("API key is not configured yet.");
      return;
    }

    data.append("access_key", key);

    try {
      const endpoint = "https://api.web3forms.com/submit";
      const res = await globalThis.fetch(endpoint, { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-8 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mb-8 flex flex-col gap-4">

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">{email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-primary" />
          <a href={web.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            {web.label}
          </a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-firstname" className="text-sm font-medium text-foreground">First Name</label>
            <input type="text" id="contact-firstname" name="first_name" required placeholder="Joy"
              className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-lastname" className="text-sm font-medium text-foreground">Last Name</label>
            <input type="text" id="contact-lastname" name="last_name" required placeholder="Sengupta"
              className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
          <input type="email" id="contact-email" name="email" required placeholder="you@example.com"
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
          <textarea id="contact-message" name="message" required rows={5} placeholder="Type your message here..."
            className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" />
        </div>

        {formStatus === "success" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-3 rounded-lg text-sm font-medium">
            <CheckCircle2 size={18} /> Message sent successfully!
          </motion.div>
        )}

        {formStatus === "error" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-lg text-sm font-medium">
            <AlertCircle size={18} className="shrink-0" /> {errorMsg}
          </motion.div>
        )}

        <motion.button 
          type="submit" 
          disabled={isSending}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          variants={{ hover: { scale: 1.02 } }}
          className="btn-sweep-fill group w-full rounded-lg bg-transparent border border-foreground text-foreground font-medium py-3 mt-2 hover:text-background hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSending ? (
              <><Loader2 size={18} className="animate-spin" /> Sending...</>
            ) : (
              <>
                Submit 
                <motion.div
                  variants={{
                    hover: { x: 4, y: -4 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Send size={18} />
                </motion.div>
              </>
            )}
          </span>
        </motion.button>
      </form>
    </div>
  );
}

// Main Contact Section
export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-sans tracking-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Have a project in mind or just want to say hi? Feel free to reach out using the form below or connect with me directly.
          </p>
          <a 
            href="/resume.pdf" 
            download="Resume.pdf"
            className="btn-sweep-fill group inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-sans tracking-widest rounded-full bg-transparent border border-foreground text-foreground hover:text-background transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Download Resume <Download size={18} />
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
          <div className="flex w-full h-full items-stretch justify-center">
            <ProfileCardGrid />
          </div>
          <div className="w-full h-full">
            <ContactFormSection
              title="Contact Me"
              description="I am available for questions, feedback, or collaboration opportunities."
              email="joysengupta521@gmail.com"
              web={{ label: "0xJoy07", url: "https://github.com/0xJoy07" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
