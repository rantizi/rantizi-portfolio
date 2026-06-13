import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { PrimaryButton, GhostButton } from "./ui/Buttons";
import { CONTACT } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border-[1.5px] border-latte bg-paper px-7 pb-14 pt-[70px] text-center shadow-pop">
            {/* Soft corner glows */}
            <div aria-hidden="true" className="absolute -left-[60px] -top-[80px] size-60 rounded-full bg-sage-soft opacity-60 blur-[40px]" />
            <div aria-hidden="true" className="absolute -bottom-[80px] -right-[60px] size-60 rounded-full bg-peach-soft opacity-60 blur-[40px]" />

            <div className="relative z-10">
              <span className="eyebrow">💌 Contact</span>
              <h2 className="mb-3 mt-[18px] font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold">
                Let's build something <span className="hl">tidy</span> together
              </h2>
              <p className="mx-auto mb-8 max-w-[460px] text-ink-soft">
                Open to internships, data projects, team collaborations, or just a friendly chat about why
                your spreadsheet broke.
              </p>
              <div className="mb-6 flex flex-wrap justify-center gap-3.5">
                <PrimaryButton href={`mailto:${CONTACT.email}`}>📨 Email me</PrimaryButton>
                <GhostButton href="#home">Back to top ↑</GhostButton>
              </div>
              <div className="flex justify-center gap-3">
                {CONTACT.socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -3, rotate: -2 }}
                    className="rounded-full border-2 border-latte-deep bg-cream px-[18px] py-2 text-[0.88rem] font-bold transition-colors hover:border-sky hover:bg-sky-soft"
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
              <p className="hand mt-6 text-[1.2rem]">
                usually replies faster than a SELECT * on a small table 🐢💨
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
