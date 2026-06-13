import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import Reveal, { EASE_OUT } from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { CERTIFICATES, STATS } from "../data/content";

/** Counts from 0 to `to` once the element scrolls into view. */
function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

function CertificateImage({ certificate }) {
  const [failed, setFailed] = useState(false);
  const hasImage = certificate.image && !failed;

  return (
    <div className="mb-4 overflow-hidden rounded-[16px] border-[1.5px] border-latte bg-cream">
      {hasImage ? (
        <img
          src={certificate.image}
          alt={`${certificate.title} from ${certificate.issuer}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-linear-to-br from-peach-soft via-sage-soft to-sky-soft px-5 text-center">
          <div>
            <span className="mb-1 block text-[1.8rem]">📜</span>
            <p className="font-display text-[0.98rem] font-extrabold">Certificate image coming soon</p>
            <p className="mt-1 text-[0.76rem] font-semibold text-cocoa">Still counted, still tidy.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Achievements() {
  const featuredCertificates = CERTIFICATES.filter((certificate) => certificate.featured);

  return (
    <section id="certificates" className="pb-[30px] pt-20 lg:pt-[110px]">
      <div className="container-app">
        <SectionHeading
          eyebrow="🏆 Certificates"
          title={
            <>
              Tiny proof shelf, <span className="hl hl-sky">proudly kept</span>
            </>
          }
          sub="A small collection of internship, data, cloud, software, and organization milestones - each one adds a little more structure to the way I build, analyze, and collaborate."
        />
        <div className="mb-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, rotate: -1 }}
                data-cursor
                className="rounded-[18px] border-[1.5px] border-latte bg-paper px-4 py-6 text-center shadow-card transition-colors hover:border-sage"
              >
                <span className="font-display text-[1.7rem] font-extrabold leading-none md:text-[2.2rem]">
                  {stat.infinity ? (
                    "∞"
                  ) : (
                    <>
                      <Counter to={stat.value} />
                      <small className="text-[1.2rem]">{stat.suffix}</small>
                    </>
                  )}
                </span>
                <span className="mt-1.5 block text-[0.82rem] font-semibold text-ink-soft">{stat.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredCertificates.map((certificate, i) => (
            <Reveal key={certificate.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -5, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                data-cursor
                className="h-full rounded-[22px] border-[1.5px] border-latte bg-paper px-[22px] pb-[22px] pt-[26px] shadow-card"
              >
                <CertificateImage certificate={certificate} />
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[1.05rem] font-extrabold">{certificate.title}</h3>
                  <span className="rounded-full border-[1.5px] border-latte-deep bg-cream px-2.5 py-0.5 text-[0.68rem] font-extrabold text-cocoa">
                    {certificate.year}
                  </span>
                </div>
                <p className="mb-1 text-[0.82rem] font-bold text-cocoa">{certificate.issuer}</p>
                <p className="mb-3 text-[0.85rem] text-ink-soft">{certificate.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {certificate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border-[1.5px] border-latte-deep bg-cream px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.04em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {certificate.credentialUrl && (
                  <motion.a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, rotate: -1 }}
                    className="mt-4 inline-flex rounded-full bg-espresso px-4 py-2 text-[0.78rem] font-extrabold text-cream"
                  >
                    View credential
                  </motion.a>
                )}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
