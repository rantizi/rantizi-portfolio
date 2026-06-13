import BackgroundBlobs from "./BackgroundBlobs";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { GhostButton } from "./ui/Buttons";
import { ProjectCard } from "./Projects";
import { PROJECTS } from "../data/content";

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10 pb-[30px] pt-[140px]">
        <section>
          <div className="container-app">
            <SectionHeading
              eyebrow="🗂️ Full project shelf"
              title={
                <>
                  All the builds, <span className="hl">neatly gathered</span>
                </>
              }
              sub="The complete project library: client work, internship dashboards, data analysis pieces, coursework builds, and small experiments that left useful lessons behind."
            />
            <Reveal>
              <div className="mb-8">
                <GhostButton href="/">Back to homepage</GhostButton>
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <Reveal key={project.title} delay={(i % 2) * 0.08}>
                  <ProjectCard project={project} expanded />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
