# CODEX_RULES.md

## Core Instruction

You are editing an existing approved portfolio website for Abdul Aziz Rantizi.

The design is already approved.

Do not redesign the website.

Do not rebuild the project from scratch.

Do not replace the visual direction with a new template.

## Local Path

```text
D:\Codes\Portofolio
Current Stack
The project uses:

Vite
React
Tailwind CSS
Framer Motion
Design Preservation Rules
Keep the current:

warm pastel color palette
cream / beige / soft brown / sage / sky / peach tones
rounded cards
soft shadows
subtle borders
handwritten-style details
tape/sticky-note details
playful but professional feeling
smooth Framer Motion interactions
custom cursor behavior
scroll progress
animated blobs
card hover/tilt feeling
easter eggs if already implemented
Do Not Change
Do not change the overall visual identity.
Do not switch to a dark tech/cyber theme.
Do not make the website corporate, cold, or generic.
Do not remove the playful personality.
Do not remove existing motion/easter eggs unless they break the build.
Do not replace Tailwind/Framer Motion with another UI library.
Do not introduce heavy dependencies unless absolutely necessary.
Do not use a database for screenshots or certificates.
Do not edit dist/ manually.

Preferred Editing Strategy
Prefer editing:

src/data/content.js
Then update existing components only as needed.
If adding a full projects page, keep it consistent with current components and styles.
If adding reusable components, keep them small and easy to understand.

Content Source Priority
Use these files as the source of truth:

docs/PROJECTS_CONTENT.md
docs/EXPERIENCE_CONTENT.md
docs/CERTIFICATES_CONTENT.md
docs/ASSETS_GUIDE.md
docs/CONTENT_TONE.md
Project Page Rules
Homepage Projects section should show only 4 featured projects:

Busana Arafah
FromFram
Infomedia Sales Funnel Dashboard
Data Warehouse Shopee
Full Projects page should show all 10 projects.
Add a CTA under homepage projects linking to the full projects page.

Screenshot Rules
Screenshots may not be ready yet.
The code must work even if:

coverImage: ""
images: []
Show a soft placeholder instead of breaking the layout.

Certificate Rules
Change Achievements into Certificates.
Homepage should show featured certificates only.
Do not make certificate cards too large or overwhelming.
Keep certificates as a small proof shelf.

Accessibility Rules
Keep semantic HTML where possible.
Buttons and links must be keyboard accessible.
Images should have meaningful alt text.
Respect reduced motion behavior if already present.
Do not create UI that only works with hover.

Build Rules
After editing, run:

npm run build
Fix any build errors.
The final answer must include:

Files changed
Summary of updates
Whether build passed
Any missing screenshots or placeholders
How to run locally
Final Check
Before final response, verify:

homepage loads
projects section uses real data
full projects page exists or equivalent full project view exists
certificates section uses real certificate data
experience section uses real timeline data
design still looks like the approved screenshot
no obvious console errors
npm run build passes