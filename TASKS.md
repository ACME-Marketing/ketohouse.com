# Actionable Task List: KetoHouse.com MVP

**Version:** 1.0
**Date:** 2025-07-25

This document breaks down the KetoHouse.com MVP project into a checklist of actionable tasks. 

## Phase 1: Foundation & Setup

- [x] **Project Initialization**
    - [x] Initialize a new Astro project.
    - [x] Add and configure Tailwind CSS.
    - [x] Configure Prettier and ESLint for code consistency.
    - [ ] Configure Prettier and ESLint for code consistency.
- [x] **Directory Structure**
    - [x] Create the directory structure as defined in `CLAUDE.md` (`/components`, `/layouts`, `/lib`, etc.).
- [x] **WordPress Integration**
    - [x] Create `lib/wordpress.js` to house GraphQL queries and the fetch client.
    - [x] Add environment variables for the WordPress GraphQL endpoint URL (`WORDPRESS_GRAPHQL_URL`).
    - [x] Create a test query to ensure the connection to WordPress is working.

## Phase 2: Core Content & UI Development

- [x] **Layouts**
    - [x] Create `src/layouts/BaseLayout.astro` with a header, footer, and a `<slot />` for page content.
    - [ ] Create `src/layouts/PostLayout.astro` for styled article/recipe content.
- [x] **Components**
    - [x] Create `src/components/Header.astro` with navigation links.
    - [x] Create `src/components/Footer.astro` with relevant links and copyright info.
    - [x] Create `src/components/RecipeCard.astro` for displaying recipe previews.
    - [x] Create `src/components/ArticlePreview.astro` for blog/science article previews.
    - [x] Create `src/components/Button.astro` for consistent button styling.
- [x] **Static Pages**
    - [x] Build `src/pages/index.astro` (Homepage).
    - [x] Build `src/pages/mind-and-body.astro`.
    - [x] Build `src/pages/meal-planners.astro`.
- [x] **Placeholder Pages**
    - [x] Build `src/pages/courses.astro` with a "Notify Me" form.
    - [x] Build `src/pages/shop.astro` with a "Notify Me" form.
- [x] **n8n Integration**
    - [x] Write the client-side JavaScript to handle form submission to n8n webhooks.
    - [x] Add the script to the `courses.astro` and `shop.astro` pages.

## Phase 3: Content Integration & Styling

- [x] **Dynamic Pages**
    - [x] Build `src/pages/recipes/[...slug].astro` to render individual recipes.
    - [x] Build `src/pages/science/[...slug].astro` to render individual science articles.
    - [x] Implement `getStaticPaths` in the dynamic routes to fetch all content from WordPress at build time.
- [x] **Content Display**
    - [x] Populate the homepage with featured recipes and articles.
    - [x] Create the main recipe listing page at `/recipes`, fetching and displaying all recipes.
    - [x] Implement basic tag-based filtering on the recipe listing page.
    - [x] Ensure all content queries filter by 'ketohouse' tag.
- [x] **Styling**
    - [x] Apply Tailwind CSS classes to all pages and components for a polished look and feel.
    - [x] Use `@tailwindcss/typography` or global styles to ensure WordPress content in `set:html` is styled correctly.
    - [x] Ensure the site is fully responsive on mobile, tablet, and desktop devices.
    - [ ] Implement a simple preloader.

## Phase 4: Testing, Deployment & Launch

- [ ] **Testing**
    - [ ] Manually test all pages and links.
    - [ ] Verify that the "Notify Me" forms successfully submit to n8n.
    - [ ] Test on multiple browsers (Chrome, Firefox, Safari).
    - [ ] Perform accessibility (a11y) checks.
- [ ] **Deployment**
    - [ ] Create a `render.yaml` or configure the Render.com dashboard for a new Static Site.
    - [ ] Set the build command to `npm run build`.
    - [ ] Set the publish directory to `dist`.
    - [ ] Add the `WORDPRESS_GRAPHQL_URL` environment variable to Render.com.
    - [ ] Push the main branch to trigger the first deployment.
- [ ] **Launch**
    - [ ] Verify the live site on its Render.com URL.
    - [ ] (If applicable) Point the custom domain to the Render.com service.
    - [ ] Announce the launch!
