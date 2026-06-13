# PORTFOLIO_CHANGE_REQUEST.md

## Main Goal

Update Abdul Aziz Rantizi's portfolio content while keeping the current approved visual design.

The website is already visually approved. Do not redesign it. Only improve the content structure, project data, experience data, certificate data, and screenshot/gallery support.

Local project path:

```text
D:\Codes\Portofolio
Current Tech Stack
The portfolio is built with:

Vite
React
Tailwind CSS
Framer Motion
Important Rule
Do not rewrite the entire project from scratch.
Prioritize editing existing files, especially:

src/data/content.js
src/components/
src/App.jsx
Create new components/pages only when needed.

Files to Read First
Before making changes, read these files:

docs/PROJECTS_CONTENT.md
docs/EXPERIENCE_CONTENT.md
docs/CERTIFICATES_CONTENT.md
docs/ASSETS_GUIDE.md
docs/CODEX_RULES.md
docs/CONTENT_TONE.md
Required Changes
1. About Section
Update the About copy.
Current wording mentions:

Python, SQL, C++, and Java
Change it to include:

Python, SQL, C++, JavaScript, TypeScript, and Java
Keep the tone warm, playful, tidy, and professional.

2. Skills Section
Update the “Code & coordination” skill chips.
Programming languages must appear first in this exact order:

Python
SQL
C++
JavaScript
TypeScript
HTML
CSS
Java
After those, keep the useful existing chips such as:

Git & GitHub
Database Design
Project Coordination
Task & Timeline Planning
Documentation
General IT Support
Debugging Patience +10
Do not remove the current playful style.

3. Projects Section on Homepage
Replace the current placeholder projects with 4 featured projects:

Busana Arafah
FromFram
Infomedia Sales Funnel Dashboard
Data Warehouse Shopee
Use the content from:

docs/PROJECTS_CONTENT.md
Homepage should only show these 4 featured projects.

4. Full Projects Page
Create a full projects page that contains all 10 projects:

Busana Arafah
FromFram
Infomedia Sales Funnel Dashboard
Data Warehouse Shopee
Clicked Ads on Website Dashboard
Price House USA Dashboard
LOTR Semantic Web
NutriLens
Apotek Order
Gravion
Add a CTA under the homepage Projects section that links to the full projects page.
Recommended CTA copy:

Want to peek at the rest of the build shelf?
I keep the extra projects here — some are dashboards, some are coursework gems, and some are tiny experiments that taught me a lot.
View all projects →
If routing is already available, use a route such as:

/projects
If routing is not installed, use a simple state-based page switch or install React Router only if necessary.

5. Project Screenshot Support
Add support for project screenshots using static assets from:

public/assets/projects/
Important: screenshots may not be ready yet.
The code must not break if:

coverImage: ""
images: []
If a project has no image yet, show a soft placeholder that matches the current design.
Do not require a database.

6. Experience Section
Replace the current placeholder timeline with experience data from:

docs/EXPERIENCE_CONTENT.md
Use these entries:

Full Stack Developer — Busana Arafah
Full Stack Developer — PT Infomedia Nusantara
Data Analyst Intern — Luar Sekolah
Cloud Computing Trainee — Orbit Future Academy
If volunteer/organization experience is included, keep it compact and do not make it larger than the technical/project experience.
Recommended section title:

Where I've learned by building
Recommended subtitle:

A mix of real client work, internship projects, data analysis training, and cloud learning — the places where the messy parts turned into actual skills.
7. Achievements / Certificates Section
Change the Achievements section into a Certificates-focused section.
Use certificate data from:

docs/CERTIFICATES_CONTENT.md
Homepage should show featured certificates only:

Internship Completion Certificate — PT Infomedia Nusantara
AWS re/Start Graduate — Orbit Future Academy / AWS
Project-Based Internship: Data Analyst — Luar Sekolah
Excel 101 — Luar Sekolah
Recommended section title:

Tiny proof shelf, proudly kept
Recommended subtitle:

A small collection of internship, data, cloud, software, and organization milestones — each one adds a little more structure to the way I build, analyze, and collaborate.
A full certificates page or modal gallery is optional. If it requires too much restructuring, keep it as a future-ready data structure only.

8. Contact Data
Update contact data if needed:

Email: abdulaziz.rantizi.id@gmail.com
GitHub: [https://github.com/rantizi](https://github.com/rantizi)
LinkedIn: [https://www.linkedin.com/in/abdul-aziz-rantizi](https://www.linkedin.com/in/abdul-aziz-rantizi)
WhatsApp: +62 82128426108
Build Requirement
After editing, run:

npm run build
Fix all build errors.
Do not leave console errors.

Final Report Required
After finishing, summarize:

Files changed
What content was updated
Whether the design was preserved
Whether screenshot placeholders are supported
Build result
How to run locally