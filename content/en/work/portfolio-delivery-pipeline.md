---
title: Portfolio Delivery Pipeline
priority: supporting
url: https://github.com/nikchester/nikchester.ru
stack: Vite, React, TypeScript, Markdown, GitHub Actions, GitHub Pages, Playwright, Lighthouse, Dependabot
---

**Problem:** a public portfolio should be reliable enough to share professionally, not just visually finished.

**Action:** set up GitHub Actions for the static bilingual portfolio: every push and pull request to `main`/`dev` runs in a Playwright container that builds content from Markdown and the CV PDFs, then runs ESLint, type checks, production config and link validation, Playwright e2e tests in Chromium, Firefox and WebKit, and Lighthouse with a 90 threshold in all four categories. Deployment to GitHub Pages is a separate job that runs only from `main`; Dependabot checks dependencies weekly.

**Result:** only a build that passed every check reaches production; `dev` and pull requests get the same checks but are never published. Hosting is GitHub Pages with a custom domain at zero cost.
