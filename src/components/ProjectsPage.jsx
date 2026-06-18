import { useState } from "react";
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

const PROJECT_FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps & Systems" },
  { id: "dashboard", label: "Data Dashboards" },
  { id: "ar", label: "AR Prototype" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.filterGroup === activeFilter);

  const getFilterCount = (filterId) =>
    filterId === "all"
      ? PROJECTS.length
      : PROJECTS.filter((project) => project.filterGroup === filterId).length;

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
              <div className="mb-5">
                <GhostButton href="/">Back to homepage</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mb-8 flex flex-wrap gap-2.5" role="group" aria-label="Project filters">
                {PROJECT_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(filter.id)}
                      data-cursor
                      className={`rounded-full border-2 px-4 py-2 text-[0.8rem] font-extrabold transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-[4px] focus-visible:outline-sky ${
                        isActive
                          ? "border-espresso bg-espresso text-cream shadow-[0_8px_20px_rgba(65,56,44,0.18)]"
                          : "border-latte-deep bg-paper text-espresso shadow-card hover:border-sage hover:bg-sage-soft"
                      }`}
                    >
                      {filter.label} ({getFilterCount(filter.id)})
                    </button>
                  );
                })}
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {visibleProjects.map((project, i) => (
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
