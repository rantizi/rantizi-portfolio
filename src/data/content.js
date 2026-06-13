/* ------------------------------------------------------------------
   All page content lives here so it can be edited without touching
   any component code. Swap in your real projects, links, and email.
------------------------------------------------------------------- */

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
];

export const ROTATOR_WORDS = [
  "data analysis 📊",
  "Power BI dashboards 📈",
  "cleaning messy CSVs 🧹",
  "Python & SQL 🐍",
  "Excel wizardry 🧾",
  "coordinating team projects 📋",
];

export const HERO_STICKERS = [
  { label: "🐍 Python", className: "top-[2%] left-0 border-sage", rotate: -8, delay: 0.2 },
  { label: "🗃️ SQL", className: "top-[16%] -right-[4%] border-sky", rotate: 6, delay: 0.8 },
  { label: "📊 Power BI", className: "bottom-[24%] -left-[6%] border-peach", rotate: 5, delay: 1.4 },
  { label: "☕ Java", className: "bottom-[4%] right-[2%] border-cocoa", rotate: -5, delay: 2 },
  { label: "⚙️ C++", className: "top-[48%] -right-[12%] border-sage", rotate: -7, delay: 2.6 },
];

export const MARQUEE_ITEMS = [
  "Python",
  "SQL",
  "C++",
  "Java",
  "Power BI",
  "Excel Dashboards",
  "Data Cleaning",
  "Visualization",
  "Project Coordination",
];

export const FACTS = [
  { icon: "🎓", title: "Studying", text: "Computer Science" },
  { icon: "📍", title: "Based in", text: "jakarta, Indonesia" },
  { icon: "🔍", title: "Focus", text: "Data analysis & software dev" },
  { icon: "🤝", title: "Soft spot", text: "Project coordination" },
];

export const SKILL_BARS = [
  { name: "🐍 Python (pandas, plots)", note: "my comfort zone", fill: 88, gradient: "from-sage to-[#A6C49F]" },
  { name: "🗃️ SQL", note: "JOINs & I get along", fill: 84, gradient: "from-sky to-[#9FC2DC]" },
  { name: "📈 Power BI", note: "dashboard mode", fill: 80, gradient: "from-peach to-[#F6D4B4]" },
  { name: "🧾 Excel dashboards", note: "pivot table fan", fill: 86, gradient: "from-cocoa to-latte-deep" },
  { name: "🧹 Data cleaning", note: "oddly satisfying", fill: 90, gradient: "from-sage to-[#A6C49F]" },
  { name: "🎨 Data visualization", note: "charts with a story", fill: 82, gradient: "from-sky to-[#9FC2DC]" },
];

export const SKILL_CHIPS = [
  "⚙️ C++",
  "☕ Java",
  "🐍 Python scripting",
  "🌿 Git & GitHub",
  "🗂️ Database design",
  "📋 Project coordination",
  "🗓️ Task & timeline planning",
  "📝 Documentation",
  "🛠️ General IT support",
  "🧪 Debugging patience +10",
];

export const PROJECTS = [
  {
    icon: "📈",
    iconBg: "bg-sage-soft",
    tape: "tape",
    title: "Sales Insight Dashboard",
    desc: "An interactive Power BI dashboard that turns raw retail sales exports into monthly trends, top-product views, and region comparisons a non-technical user can explore.",
    tags: ["Power BI", "SQL", "Data modeling"],
    did: "cleaned the source data, built the data model, and designed every visual.",
  },
  {
    icon: "🧹",
    iconBg: "bg-sky-soft",
    tape: "tape tape-sky",
    title: "Messy-CSV Cleaning Pipeline",
    desc: "A reusable Python (pandas) pipeline that takes inconsistent CSV files — mixed date formats, duplicates, stray whitespace — and outputs tidy, analysis-ready datasets with a summary report.",
    tags: ["Python", "pandas", "Data cleaning"],
    did: "wrote the cleaning rules, validation checks, and before/after report.",
  },
  {
    icon: "🏷️",
    iconBg: "bg-peach-soft",
    tape: "tape tape-peach",
    title: "Inventory Manager (CLI)",
    desc: "A command-line inventory app built in C++ with file-based storage: add, search, update, and low-stock alerts — designed around clean classes instead of one giant main().",
    tags: ["C++", "OOP", "File I/O"],
    did: "designed the class structure and led the small team that built it.",
  },
  {
    icon: "📚",
    iconBg: "bg-pink-soft",
    tape: "tape",
    title: "Student Org Database",
    desc: "A relational database (with a simple Java front end) for a student organization: members, events, attendance, and budget — replacing five conflicting spreadsheets with one source of truth.",
    tags: ["Java", "SQL", "ERD design"],
    did: "drew the ERD, wrote the queries, and coordinated the migration.",
  },
];

export const TIMELINE = [
  {
    when: "2025 — present",
    title: "Data Analysis Lab Assistant · Campus",
    desc: "Help fellow students with Python, SQL, and Excel for their analysis coursework — translating \"why is my query empty?\" panic into calm debugging sessions.",
    dot: "border-sage",
  },
  {
    when: "2024 — 2025",
    title: "Project Coordinator · Student Software Team",
    desc: "Coordinated a 5-person team across two semester projects: split tasks, ran short weekly check-ins, and kept the Git history readable enough to survive grading.",
    dot: "border-sky",
  },
  {
    when: "2023 — 2024",
    title: "IT Support Volunteer · Student Organization",
    desc: "The friendly \"have you tried turning it off and on?\" person — handled laptops, Wi-Fi, printers, and event tech setups for campus activities.",
    dot: "border-peach",
  },
];

export const STATS = [
  { value: 10, suffix: "+", label: "projects shipped" },
  { value: 100, suffix: "k+", label: "rows of data cleaned" },
  { value: 5, suffix: "", label: "dashboards built" },
  { infinity: true, label: "cups of coffee ☕" },
];

export const BADGES = [
  {
    medal: "🥇",
    title: "Data Visualization Competition — Finalist",
    desc: "Campus-level dataviz challenge: turned a public dataset into a story-driven dashboard under a tight deadline.",
  },
  {
    medal: "📜",
    title: "Data Analysis Certification",
    desc: "Completed an online data analysis track covering spreadsheets, SQL, and visualization fundamentals.",
  },
  {
    medal: "🌟",
    title: "Best Group Project — Database Course",
    desc: "The Student Org Database project earned top marks for design and documentation (the ERD poster helped).",
  },
];

export const CONTACT = {
  email: "abdulaziz.rantizi.id@email.com",
  socials: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};
