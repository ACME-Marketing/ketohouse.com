# Product Requirements Document: KetoHouse.com

**Version:** 1.0
**Date:** 2025-07-25
**Author:** Gemini

## 1. Introduction & Vision

KetoHouse.com is envisioned as a premier online resource for individuals embracing the ketogenic lifestyle, whether they are curious beginners or seasoned practitioners. The platform's mission is to provide trustworthy, science-backed information, practical tools for success, and a supportive context for the journey. We will differentiate by focusing on high-quality, well-researched content, actionable meal planning, and a holistic approach that addresses both the physical and mental challenges of dietary change.

## 2. Project Goals & Objectives

### User Goals
- To find reliable, medically-sound information about the ketogenic diet.
- To discover a wide variety of tasty and easy-to-prepare keto recipes.
- To access practical tools like meal planners and shopping lists to simplify the keto lifestyle.
- To find guidance on overcoming the common challenges associated with starting and maintaining a keto diet.

### Business Goals
- Establish KetoHouse.com as a trusted, authoritative brand in the ketogenic space.
- Build an initial user base and email list for future product and course launches.
- Create a scalable content platform that can be expanded with new features over time.
- For the MVP, validate user interest in future e-commerce and course offerings.

## 3. User Personas

### Persona 1: Alex, the Performance Seeker
- **Age:** 28
- **Occupation:** Software Developer & CrossFit Enthusiast
- **Goals:** Optimize athletic performance, enhance mental clarity and focus, and maintain low body fat.
- **Motivations:** Views nutrition as a system to be optimized for peak output. Interested in the cognitive and energy benefits of ketosis.
- **Frustrations:** Finds too much "bro-science" and conflicting information online. Needs data-driven, scientific content and recipes that support an active lifestyle.

### Persona 2: Chloe, the Health-Conscious Millennial
- **Age:** 25
- **Occupation:** Graphic Designer
- **Goals:** Lose weight gained during college, improve skin health, and adopt a sustainable, healthy lifestyle.
- **Motivations:** Is influenced by wellness trends on social media but wants a credible, long-term solution. Wants to feel more energetic and confident.
- **Frustrations:** Feels overwhelmed by restrictive diets. Needs a clear starting plan, easy recipes, and support for dealing with social situations.

### Persona 3: David, the Busy Professional
- **Age:** 45
- **Occupation:** Sales Manager
- **Goals:** Lose 30 pounds, reduce brain fog, and increase energy levels to keep up with work and family demands.
- **Motivations:** Has received a warning from his doctor about pre-diabetes. Needs a structured plan that doesn't require hours of cooking every day.
- **Frustrations:** Struggles to find time for meal prep. Often eats unhealthy takeout due to a hectic schedule.

### Persona 4: Brenda, the Health-Focused Senior
- **Age:** 65
- **Occupation:** Retired Teacher
- **Goals:** Manage weight to reduce joint pain, control blood sugar, and maintain health and mobility in retirement.
- **Motivations:** Wants to enjoy her retirement years actively and healthily. Her doctor recommended a low-carb diet.
- **Frustrations:** Finds modern health apps confusing. Needs simple, delicious recipes that are easy to cook and don't use exotic ingredients.

### Persona 5: Leo, the Bio-Hacker
- **Age:** 35
- **Occupation:** Entrepreneur
- **Goals:** Use ketosis for cognitive enhancement, longevity, and achieving a peak state of flow.
- **Motivations:** Is driven by self-improvement and data. Tracks his biometrics and wants to understand the deep science behind keto's effects on the body and mind.
- **Frustrations:** Most keto sites are too focused on basic weight loss. He needs advanced content on topics like therapeutic ketosis, fasting protocols, and supplementation.

## 4. MVP Scope & Features

The MVP will be a "stupid simple" static website to validate the concept and build an initial audience. All dynamic functionality is deferred to future phases.

### IN SCOPE for MVP:
- **Static Content Pages:**
    - **Homepage:** Hero section, featured content, introduction to the KetoHouse philosophy.
    - **The Science:** Articles on current research and medical benefits of keto, with valid citations.
    - **Getting Started:** Guides on how to begin the keto diet, manage the "keto flu," and plan for success.
- **Recipe Section:**
    - A gallery of recipes.
    - Basic filtering for recipes by cuisine and protein type (e.g., "Italian," "Chicken").
    - Recipe detail pages with ingredients, instructions, and photos.
- **Meal Planners:**
    - Static, non-interactive daily and weekly meal plan examples.
    - Pre-made shopping lists corresponding to the meal plans (e.g., simple text or downloadable PDF).
- **Mind & Body Section:**
    - A dedicated page discussing the psychological challenges of food and dieting.
    - A clear, endorsed recommendation and link to **BeMoreFree.com** as a resource for addressing these challenges.
- **Placeholder "Coming Soon" Pages:**
    - **Courses Page:** A landing page describing the vision for future courses. Will include a "Notify Me When Available" email signup form.
    - **Shop Page:** A landing page showcasing the vision for KetoHouse-branded products. Will include a "Notify Me When Available" email signup form.

### OUT OF SCOPE for MVP:
- User accounts, login, or profiles.
- Interactive or customizable meal planners.
- Database integration (Supabase will be used in a future phase).
- E-commerce functionality (shopping cart, checkout, payment processing).
- Course delivery platform (video hosting, lesson progression).
- Stripe integration.
- Community features (comments, forums).

## 5. Technical Requirements (MVP)

- **Frontend Framework:** Astro (for a high-performance static site).
- **Styling:** Tailwind CSS.
- **Content Management:** Headless WordPress will be used for the blog/article and recipe content.
- **Form Handling:** n8n will power the "Notify Me" webhooks on the placeholder Courses and Shop pages.
- **Database:** No database will be used for the MVP.
    - **Future Database Rule:** When Supabase is implemented, any field that represents a list of options (e.g., for a dropdown) MUST be of type `text`. **NO ENUM TYPES** are to be used in the database schema.
- **Hosting:** The site will be deployed on Render.com.

## 6. Future Phases (Post-MVP)

- **Phase 2: Community & Interaction**
    - Integrate Supabase for user accounts and profiles.
    - Add a comment section to recipes and articles.
    - Introduce interactive meal planners where users can save favorite recipes and generate custom shopping lists.
- **Phase 3: E-commerce Launch**
    - Build out the full shop with product pages, a shopping cart, and user reviews.
    - Integrate Stripe for secure payment processing.
- **Phase 4: Education Platform**
    - Develop the full course platform with video content, lesson tracking, and user progress.
    - Offer tiered course access (free vs. paid).

## 7. Success Metrics (MVP)

- **Engagement:**
    - Time on page for key articles and recipes.
    - Bounce rate.
    - Pages per session.
- **Audience Growth:**
    - Number of email signups from the "Notify Me" forms on the Courses and Shop pages.
- **Qualitative Feedback:**
    - Direct feedback from early users via a simple contact form.
