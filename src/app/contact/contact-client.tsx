"use client";

import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import { Space_Mono } from "next/font/google";
import Image from "next/image";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const DISPLAY_SANS = "'Satoshi','Inter',system-ui,sans-serif";

export function ContactClient({ contact }: { contact: any }) {
  return (
    <div className="bg-[#080808] text-white w-full min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-[52px] pt-[120px] md:pt-[140px] pb-14 border-b border-white/[0.05]">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(52px,10vw,140px)] font-bold tracking-[-0.06em] leading-[0.9] text-white/85"
          style={{ fontFamily: DISPLAY_SANS }}
        >
          talk to us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[clamp(15px,1.4vw,20px)] leading-relaxed text-white/40 max-w-[560px]"
          style={{ fontFamily: DISPLAY_SANS }}
        >
          Have a project or a new idea? Drop us a message and we&apos;ll get back to you.
        </motion.p>
      </section>

      {/* ── TWO-COLUMN CONTENT ────────────────────────────────────── */}
      <section className="w-full px-6 md:px-[52px] py-14 md:py-20">
        <div className="grid lg:grid-cols-2 gap-5 items-stretch">

          {/* LEFT — photo + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-[24px] overflow-hidden border border-white/[0.06] bg-[#0d0d0d] min-h-[600px]"
          >
            {/* Photo — takes most of the space */}
            <div className="relative flex-1">
              <Image
                src="/images/groupPhotos/oc.png"
                alt="DJ Unicode Organizing Committee"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info strip — solid dark, always readable */}
            <div className="px-8 py-7 flex flex-col gap-6 border-t border-white/[0.05]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <p className={`text-[9px] uppercase tracking-[0.24em] text-white/30 ${spaceMono.className}`}>Email</p>
                  <a
                    href={contact.emailHref}
                    className="text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 leading-snug"
                    style={{ fontFamily: DISPLAY_SANS }}
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className={`text-[9px] uppercase tracking-[0.24em] text-white/30 ${spaceMono.className}`}>Phone</p>
                  <a
                    href={contact.phoneHref}
                    className="text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 leading-snug"
                    style={{ fontFamily: DISPLAY_SANS }}
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className={`text-[9px] uppercase tracking-[0.24em] text-white/30 ${spaceMono.className}`}>Campus</p>
                <p
                  className="text-[13px] leading-relaxed text-white/50 max-w-sm"
                  style={{ fontFamily: DISPLAY_SANS }}
                >
                  {contact.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-[24px] border border-white/[0.06] bg-[#0d0d0d] p-8 md:p-10"
          >
            <div className="mb-8">
              <p
                className="text-[clamp(22px,2.8vw,36px)] font-semibold text-white/85 leading-tight"
                style={{ fontFamily: DISPLAY_SANS, letterSpacing: "-0.025em" }}
              >
                Send a message
              </p>
              <p
                className="mt-2.5 text-[14px] text-white/35"
                style={{ fontFamily: DISPLAY_SANS }}
              >
                We usually reply within 24 hours.
              </p>
            </div>

            <ContactForm />

            {/* Map — flush at the bottom */}
            <div className="relative mt-auto pt-8">
              <div className="relative rounded-2xl overflow-hidden h-[200px] group border border-white/[0.04]">
                <iframe
                  title="DJ Unicode location"
                  src={contact.mapEmbed}
                  className="w-full h-full border-0 grayscale contrast-[1.2] brightness-[0.65] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_12px_#0d0d0d] pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
