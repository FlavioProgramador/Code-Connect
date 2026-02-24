---
name: nextjs-architecture-enterprise-js
description: "Enterprise-grade Next.js App Router architecture using JavaScript. Server-first design, scalable structure, performance optimization, caching strategy, API standards, authentication, security and production best practices."
allowed-tools: Read, Write, Edit, Glob, Grep
risk: medium
source: custom
---

# Next.js Architecture Enterprise (JavaScript Edition)

Professional architectural standards for scalable Next.js applications using App Router with JavaScript (no TypeScript and no Tailwind).

---

# 1. Architectural Philosophy

Core principles:

- Server-first architecture
- Clear separation of concerns
- Deterministic data flow
- Cache-aware rendering
- Explicit mutation strategy
- Minimal client-side JavaScript
- Production-ready organization

Server Components are default. Client Components are exceptions.

---

# 2. Recommended Project Structure

app/
(marketing)/
page.js
(auth)/
login/page.js
register/page.js
(dashboard)/
layout.js
page.js
api/
posts/route.js
users/route.js
loading.js
error.js
not-found.js

components/
ui/
forms/
layout/

services/
repositories/
schemas/
lib/
prisma.js
auth.js

middleware.js

Structure must reflect separation between UI, business logic and data layer.

---

# 3. Server vs Client Component Strategy

Default behavior: Server Component.

Add "use client" ONLY when:

- useState
- useEffect
- Event handlers
- Browser APIs
- Interactive components
- Controlled forms

Correct architecture:

Server Component
→ fetch data
→ pass props
Client Component
→ handle interaction

Never fetch data inside Client Component unless absolutely required.

---

# 4. Data Fetching Model

Golden rule: data access happens on the server.

Fetch strategies:

Static (default build cache)
Used for marketing pages and static content.

ISR (Incremental Static Regeneration)
Used for feeds and semi-dynamic pages.

Example:
fetch(url, { next: { revalidate: 60 } })

Dynamic rendering (no cache)
Used for authenticated or personalized content.

Example:
fetch(url, { cache: "no-store" })

---

# 5. Database Architecture (With or Without Prisma)

Recommended pattern: Repository + Service Layer.

repositories/post.repository.js
services/post.service.js

Repository Layer:

- Direct database access
- Pure CRUD
- No business rules

Service Layer:

- Business logic
- Validation
- Error normalization
- Orchestration

UI must call services, never database directly.

---

# 6. Mutation Strategy

Preferred hierarchy:

1. Server Actions
2. Route Handlers
3. External APIs

Server Action rules:

- Add "use server"
- Validate inputs
- Handle errors
- Trigger revalidation when necessary

Example:
revalidatePath("/feed")

---

# 7. Caching Strategy

Three cache levels:

1. Request-level (fetch options)
2. Data-level (revalidate time)
3. Route-level config

Time-based revalidation:
next: { revalidate: 60 }

On-demand revalidation:
revalidatePath()
revalidateTag()

Disable cache:
cache: "no-store"

Caching decisions must be explicit.

---

# 8. Routing Standards

Core files:

page.js → Route UI
layout.js → Shared layout
loading.js → Suspense fallback
error.js → Error boundary
not-found.js → 404

Advanced routing:

(group) → Organize without URL change
@slot → Parallel routes
(.) → Intercepting routes (modals)

---

# 9. Authentication Architecture

Recommended model:

- HTTP-only cookies
- Server-side session validation
- Middleware-based route protection

Never store JWT in localStorage.

Use middleware.js for:

- Auth protection
- Role validation
- Conditional redirects

Authentication checks must happen on the server.

---

# 10. Performance Optimization

Image optimization:

- Always use next/image
- Define width and height
- Use priority for above-the-fold images
- Configure responsive sizes

Bundle optimization:

- Avoid unnecessary "use client"
- Use dynamic imports for heavy components
- Keep client components small
- Analyze bundle before production

Performance is primarily determined by server-first design.

---

# 11. SEO & Metadata Strategy

Static pages:

Use export const metadata.

Dynamic pages:

Use generateMetadata for:

- Posts
- Profiles
- Products
- Dynamic routes

Must include:

- Title (50–60 characters)
- Description (150–160 characters)
- Open Graph image
- Canonical URL

SEO must be deterministic and server-rendered.

---

# 12. API Route Standards (Route Handlers)

Location:
app/api/resource/route.js

Rules:

- Validate all inputs
- Wrap logic in try/catch
- Return proper HTTP status codes
- Normalize error responses
- Never expose internal stack traces

HTTP Methods:

GET → Read
POST → Create
PUT/PATCH → Update
DELETE → Remove

APIs must be predictable and consistent.

---

# 13. Error Handling Strategy

Every route group should include:

- loading.js
- error.js

Errors must be normalized before returning.

Never leak sensitive information.

---

# 14. Security Guidelines

- Validate all user input
- Sanitize dynamic content
- Protect routes via middleware
- Use secure cookies
- Never trust client data
- Apply rate limiting when required
- Validate environment variables at startup

Security is mandatory at every layer.

---

# 15. Styling Strategy (Without Tailwind)

Recommended approaches:

- Global CSS
- CSS Modules
- Component-scoped stylesheets

Avoid:

- Large monolithic CSS files
- Excessive inline styles
- Style duplication

UI styling must not interfere with architecture clarity.

---

# 16. Anti-Patterns

Do not:

- Add "use client" everywhere
- Fetch inside Client Components
- Access database directly from UI
- Skip loading states
- Skip error boundaries
- Inflate client bundle
- Store authentication tokens in localStorage
- Ignore cache configuration

---

# 17. Production Checklist

Before deployment:

- Remove console.log
- Validate environment variables
- Confirm cache strategy
- Test authentication flow
- Test error boundaries
- Analyze bundle size
- Validate metadata
- Secure cookies configuration
- Confirm database connection stability

---

# 18. When To Use This Skill

Apply this skill when:

- Starting a new Next.js App Router project
- Refactoring for scalability
- Designing enterprise-level architecture
- Building database-backed systems
- Preparing for production deployment
- Scaling applications to high traffic

---

# 19. Core Philosophy Summary

Server-first architecture.
Explicit caching strategy.
Layered separation of concerns.
Minimal client JavaScript.
Controlled mutation flow.
Production-oriented structure.
Security by default.
Performance by design.

This skill defines professional, scalable, enterprise-level standards for building Next.js applications using JavaScript without TypeScript and without Tailwind.
