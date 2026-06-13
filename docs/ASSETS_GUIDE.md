# ASSETS_GUIDE.md

## Goal

This file defines how project screenshots, project covers, certificate images, and placeholder images should be stored in the portfolio.

The website is static and deployed with Vite/Vercel, so assets should live inside:

```text
public/assets/
Do not use a database for images.

Main Asset Folder Structure
Use this structure:

public/
  assets/
    projects/
      _placeholder/
        cover.webp

      busana-arafah/
        cover.webp
        01-homepage.webp
        02-product-detail.webp
        03-checkout.webp

      fromfram/
        cover.webp
        01-homepage.webp
        02-subscription.webp
        03-payment.webp

      infomedia-dashboard/
        cover.webp
        01-dashboard-overview.webp
        02-funnel-table.webp
        03-upload-flow.webp

      data-warehouse-shopee/
        cover.webp
        01-overview.webp
        02-revenue-profit.webp
        03-star-schema.webp

      clicked-ads-dashboard/
        cover.webp
        01-overview.webp
        02-click-segment.webp
        03-location-analysis.webp

      price-house-usa-dashboard/
        cover.webp
        01-overview.webp
        02-price-pattern.webp
        03-regression-analysis.webp

      lotr-semantic-web/
        cover.webp
        01-search-page.webp
        02-character-detail.webp
        03-sparql-result.webp

      nutrilens/
        cover.webp
        01-onboarding.webp
        02-scan-page.webp
        03-ar-result.webp

      apotek-order/
        cover.webp
        01-dashboard.webp
        02-order-flow.webp
        03-report.webp

      gravion/
        cover.webp
        01-homepage.webp
        02-flight-search.webp
        03-booking-flow.webp

    certificates/
      infomedia-internship-completion.webp
      luarsekolah-data-analyst-pbi.webp
      luarsekolah-excel-101.webp
      orbit-aws-restart-certificate.webp
      aws-restart-graduate-badge.webp
      linkedin-ethics-in-technology.webp
      linkedin-figma-for-ux-design.webp
      linkedin-kanban-for-developers.webp
      ccna-networking-certificate.webp
      himatif-admin-secretarial-staff.webp
      iffd-inventory-2024.webp
Cover Image vs Screenshot
Cover Image
cover.webp is the main thumbnail image used on:

homepage project cards
full projects page cards
project preview sections
It should be the most visually attractive image for the project.
The cover can be:

A clean screenshot from the project, or
A custom Canva-made cover, or
A designed mockup using real screenshots.
Recommended size:

1200 x 800 px
or

1600 x 1000 px
Screenshot Images
Screenshot images are proof images used in galleries, modals, or project detail pages.
Examples:

01-homepage.webp
02-dashboard.webp
03-payment.webp
Recommended size:

Full width around 1200–1600 px
Do not upload extremely huge screenshots if they are not needed.

File Format
Preferred format:

.webp
Why WebP:

smaller file size
faster page loading
good quality for web
works well on modern browsers
PNG/JPG is still allowed if needed, but WebP is preferred.

Screenshot Conversion Guide
For project screenshots:

Use WebP quality 85–90
For certificate images:

Use WebP quality 90–95
If certificate text becomes blurry, keep the certificate image as PNG.

Empty Image Support
Some screenshots may not be ready yet.
The code must support empty image fields:

coverImage: ""
images: []
If no image exists, show a soft placeholder card instead of breaking the layout.
Suggested fallback:

coverImage: "/assets/projects/_placeholder/cover.webp"
Suggested Project Data Shape
Use this shape in src/data/content.js:

{
  title: "Busana Arafah",
  year: "2026",
  role: "Full Stack Developer",
  category: "Web Application",
  tech: ["Next.js", "TypeScript", "Supabase"],
  demoUrl: "https://busana-arafah-web.vercel.app",
  githubUrl: "https://github.com/rantizi/busana-arafah-web",
  coverImage: "/assets/projects/busana-arafah/cover.webp",
  images: [
    "/assets/projects/busana-arafah/01-homepage.webp",
    "/assets/projects/busana-arafah/02-product-detail.webp",
    "/assets/projects/busana-arafah/03-checkout.webp"
  ],
  featured: true
}
Naming Rules
Use lowercase folder names.
Use kebab-case:

busana-arafah
data-warehouse-shopee
price-house-usa-dashboard
Avoid spaces:

wrong: Busana Arafah Screenshot 1.png
right: 01-homepage.webp
Asset Safety Rules
Do not store images inside src/ unless there is a specific reason.
Do not import every screenshot manually if paths can live in data arrays.
Do not use external image URLs for private/internal project screenshots.
Do not break the app if the image path does not exist yet.
Do not commit very large raw image files if compressed WebP is available.