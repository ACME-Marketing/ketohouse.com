# CLAUDE: High-Level Technical Design

**Version:** 1.0
**Date:** 2025-07-25
**Related PRD:** [PRD.md](./PRD.md)

## 1. Core Components

This document outlines the high-level technical components for the KetoHouse.com MVP.

### 1.1. Frontend Application (Astro)
- **Description:** The primary user-facing application. It will be a static site generated by Astro, ensuring maximum performance, security, and SEO.
- **Responsibilities:**
    - Render all UI components and pages.
    - Fetch data from the Headless WordPress API at build time.
    - Provide a clean, responsive user experience using Tailwind CSS.
    - Handle client-side interactions, including the n8n webhook submissions for the "Notify Me" forms.

### 1.2. Content Source (Headless WordPress)
- **Description:** A decoupled WordPress instance serving as the CMS for all content, including articles, recipes, and scientific research pages.
- **Responsibilities:**
    - Provide a user-friendly interface for content creators to write, edit, and manage content.
    - Expose all content via its GraphQL API.
    - Manage content taxonomy (categories and tags) for filtering, such as `cuisine` and `protein_type` for recipes.

### 1.3. Form Handling (n8n)
- **Description:** An n8n instance will handle form submissions from the static frontend.
- **Responsibilities:**
    - Provide webhook URLs for the "Notify Me" forms on the placeholder Courses and Shop pages.
    - Receive JSON data from the frontend.
    - (In n8n workflow) Add the submitted email addresses to a mailing list or a simple data store (e.g., Google Sheets, or a Supabase table in the future).

## 2. Data & Content Flow

1.  **Content Creation:** A content creator writes a new recipe in the WordPress admin panel and assigns it the tags "Italian" and "Chicken".
2.  **Build Process:** A developer triggers a new build on Render.com (e.g., via a `git push`).
3.  **Data Fetching:** During the build, the Astro application sends a GraphQL query to the WordPress API to fetch all published recipes and articles.
4.  **Static Site Generation:** Astro receives the content and generates static HTML pages for each recipe and article (e.g., `/recipes/creamy-tuscan-chicken`).
5.  **Deployment:** Render.com deploys the newly generated static files to its global CDN.
6.  **User Interaction:** A user visits KetoHouse.com, navigates to the "Shop" page, and fills out the "Notify Me" form.
7.  **Webhook Submission:** The browser sends a `POST` request with the user's email to the n8n webhook URL.
8.  **n8n Workflow:** The n8n workflow is triggered, capturing the email and adding it to the designated list.

## 3. Application Structure (Astro Project)

```
/src/
|-- assets/               # Static assets like logos, favicon.
|-- components/           # Reusable UI components (e.g., Header, Footer, RecipeCard, ArticlePreview).
|-- layouts/              # Base layouts for different page types (e.g., BaseLayout.astro, PostLayout.astro).
|-- lib/                  # Core logic, including the GraphQL client for WordPress.
|   `-- wordpress.js      # Functions to query the WordPress GraphQL API.
|-- pages/                # All site pages.
|   |-- index.astro         # Homepage.
|   |-- science/          # Static pages for scientific articles.
|   |   `-- [...slug].astro # Dynamic route for individual science articles.
|   |-- recipes/          # Recipe landing/listing page.
|   |   `-- [...slug].astro # Dynamic route for individual recipe pages.
|   |-- meal-planners/    # Static pages for meal plans and shopping lists.
|   |-- mind-and-body.astro # Page for the BeMoreFree.com recommendation.
|   |-- courses.astro       # "Coming Soon" page for courses.
|   `-- shop.astro          # "Coming Soon" page for the shop.
`-- styles/               # Global CSS and Tailwind styles.
```

## 4. Key Technical Decisions & Rules

- **Static First:** The entire architecture is built around the principle of a static site for the MVP. No server-side rendering or server-side logic will reside in the Astro application.
- **Decoupled Content:** Content is strictly managed in WordPress and consumed via API, separating content management from presentation.
- **No Database (MVP):** The MVP will be database-free. All content is sourced from WordPress at build time.
- **Future-Proofing Database Rules:** When Supabase is introduced post-MVP, the schema design must adhere to the "no enum types" rule specified in the PRD. All choice-based fields will use the `text` type.
- **Deployment Target:** The application will be configured for deployment on Render.com as a Static Site.
