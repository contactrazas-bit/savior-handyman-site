# Savior Handyman Services — Final Vercel Package

A production-ready static website for Savior Handyman Services. The site presents HVAC, plumbing, and electrical as three full flagship service chapters, followed by appliance repair, handyman services, pressure washing, painting, and home maintenance.

## Project structure

```text
savior-home-services-final/
├── index.html
├── preview.html
├── README.md
├── .gitignore
├── vercel.json
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── images/
        ├── brand/
        ├── hero/
        ├── hvac/
        ├── plumbing/
        ├── electrical/
        ├── handyman/
        ├── appliances/
        ├── pressure-washing/
        └── gallery/
```

## Preview locally

### Standalone preview

Open `preview.html` directly in a modern browser. It contains embedded CSS, JavaScript, and images, so no server is required.

### Production-file preview

From the `savior-home-services-final/` folder, run:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Deploy to Vercel

No build command or npm installation is required.

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import the GitHub repository or upload the `savior-home-services-final` folder.
4. Choose **Other** as the framework preset.
5. Leave the Build Command and Output Directory empty.
6. Deploy.

The included `vercel.json` contains:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of `savior-home-services-final/` to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for the Pages URL.

All production asset paths are relative.

## Connect an existing domain

### Vercel

1. Open the deployed Vercel project.
2. Go to **Settings → Domains**.
3. Add the domain.
4. Follow the DNS instructions shown by Vercel at the domain registrar.

### GitHub Pages

1. Open **Settings → Pages**.
2. Enter the custom domain.
3. Add the required DNS records at the domain registrar.

Domain registration and hosting costs depend on the selected providers.

## Replace images

1. Add the replacement JPEG and WebP files to the appropriate folder under `assets/images/`.
2. Update the relevant `<picture>` element in `index.html`.
3. Preserve accurate `width`, `height`, `alt`, `srcset`, and `sizes` attributes.
4. Rebuild `preview.html` so the standalone preview contains the new image.

Use natural-color project photographs. Do not create before-and-after relationships unless both images clearly show the same project.

## Update services

Service copy appears in:

- The hero and three-specialty overview
- The HVAC chapter
- The plumbing chapter
- The electrical chapter
- The supporting-services section
- The FAQs and final call to action

Keep public wording within confirmed service scope. Do not add licensing, insurance, emergency, guarantee, financing, warranty, commercial-service, response-time, or free-estimate claims without written confirmation.

## Update reviews

Review content appears in:

- The HVAC chapter trust statement
- The featured customer review
- The manual review slider

Preserve the meaning of the approved customer feedback. Add dates only when they can be verified. Do not create new quotations.

## Confirm the service area

Current public wording:

> Serving Palm Beach County and nearby communities.

Palm Springs, Florida is shown as the business base. Replace the general wording only after exact service boundaries are confirmed.

## Estimate-policy CTA update

The site currently uses **Request Service**. If the business confirms a free-estimate policy, these CTAs may be changed to **Request a Free Estimate**:

- HVAC chapter secondary CTA
- Plumbing chapter secondary CTA
- Electrical chapter secondary CTA
- Supporting-services CTA
- Contact-section request language

## Launch verification checklist

1. Exact Palm Beach County service boundaries
2. Additional surrounding areas
3. HVAC licensing
4. Plumbing licensing
5. Electrical licensing
6. Insurance status
7. Free-estimate policy
8. Emergency-service availability
9. Same-day-service availability
10. Satisfaction-guarantee terms
11. Residential and commercial service scope
12. Exact pressure-washing services and methods
13. Exact electrical project limitations
14. Exact HVAC project limitations
15. Exact plumbing project limitations
16. Production domain
17. Contact email
18. Whether a real estimate form will be connected
19. Exact Google Maps business-listing URL
20. Original review dates and approved quotation wording

The public website intentionally avoids treating these items as confirmed claims.

## Current public positioning

- Savior Handyman Services
- Honest. Reliable. Professional.
- HVAC, plumbing, electrical, appliance, handyman, pressure-washing, painting, and home-maintenance support
- Palm Springs, Florida base
- Serving Palm Beach County and nearby communities
- Open 24 hours for project calls
- 4.9 Google rating from 14 customer reviews
- Phone: (561) 247-3301

## Ownership and dependencies

The client owns the HTML, CSS, JavaScript, and locally stored image files in this package. The site uses no React, Vue, Angular, Bootstrap, Tailwind, jQuery, page builder, paid animation plugin, npm dependency, or proprietary hosting requirement.
