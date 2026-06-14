import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
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
  const imageSrc = certificate.image?.trim();
  const hasImage = Boolean(imageSrc) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [imageSrc]);

  return (
    <div className="certificate-folder relative mb-4 overflow-visible">
      <span aria-hidden="true" className="certificate-folder-tab" />
      <span aria-hidden="true" className="certificate-folder-base" />
      <div className="certificate-document relative z-10 overflow-hidden rounded-[16px] border-[1.5px] border-latte bg-cream">
        {hasImage ? (
        <img
          src={imageSrc}
          alt={`${certificate.title} certificate`}
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 z-20 rotate-3 scale-95 rounded-full border-[1.5px] border-sage bg-paper/95 px-3 py-1 font-display text-[0.72rem] font-extrabold text-cocoa opacity-0 shadow-card transition duration-300 ease-out group-hover:rotate-[-2deg] group-hover:scale-100 group-hover:opacity-100 group-focus-within:rotate-[-2deg] group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        Proof kept &#10022;
      </span>
    </div>
  );
}

function CertificateCard({ certificate }) {
  return (
    <motion.article
      data-cursor
      className="certificate-card group h-full rounded-[22px] border-[1.5px] border-latte bg-paper px-[22px] pb-[22px] pt-[26px] shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[5px] hover:border-sage focus-within:-translate-y-[5px] focus-within:border-sage focus-within:shadow-pop"
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
      <div className="certificate-tags flex flex-wrap gap-2">
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
  );
}

export default function Achievements() {
  const [showMoreCertificates, setShowMoreCertificates] = useState(false);
  const featuredCertificates = CERTIFICATES.filter((certificate) => certificate.featured === true);
  const extraCertificates = CERTIFICATES.filter((certificate) => certificate.featured !== true);
  const extraCertificatesId = "extra-certificates";

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
              <CertificateCard certificate={certificate} />
            </Reveal>
          ))}
        </div>
        {extraCertificates.length > 0 && (
          <div className="mt-8 text-center">
            <p className="mb-3 font-display text-[1.02rem] font-extrabold">
              Still curious? I keep a few more learning receipts here.
            </p>
            <motion.button
              type="button"
              aria-expanded={showMoreCertificates}
              aria-controls={extraCertificatesId}
              onClick={() => setShowMoreCertificates((current) => !current)}
              data-cursor
              whileHover={{ y: -3, rotate: showMoreCertificates ? 1 : -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex rounded-full border-[1.5px] border-latte-deep bg-paper px-5 py-2.5 text-[0.84rem] font-extrabold text-espresso shadow-card transition-colors hover:border-sage hover:bg-sage-soft"
            >
              {showMoreCertificates ? "Hide extra certificates ↑" : "View more certificates →"}
            </motion.button>
          </div>
        )}
        <AnimatePresence initial={false}>
          {showMoreCertificates && extraCertificates.length > 0 && (
            <motion.div
              id={extraCertificatesId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {extraCertificates.map((certificate, i) => (
                  <CertificateCard key={certificate.title} certificate={certificate} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
