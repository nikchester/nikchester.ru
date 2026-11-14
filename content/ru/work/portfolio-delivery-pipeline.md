---
title: Portfolio Delivery Pipeline
priority: supporting
url: https://github.com/nikchester/nikchester.ru
stack: Vite, React, TypeScript, Markdown, GitHub Actions, GitHub Pages, Playwright, Lighthouse, Dependabot
---

**Проблема:** публичное портфолио должно быть не только визуально готовым, но и достаточно надежным, чтобы отправлять его работодателям и техническим контактам.

**Действие:** настроил GitHub Actions для статического bilingual-портфолио: на каждый push и PR в `main`/`dev` в контейнере Playwright собирается контент из Markdown и PDF CV, проходят ESLint, проверка типов, валидация production-конфига и ссылок, e2e-тесты Playwright в Chromium, Firefox и WebKit и Lighthouse с порогом 90 по всем четырём категориям. Деплой на GitHub Pages идёт отдельным job только из `main`; зависимости раз в неделю проверяет Dependabot.

**Результат:** в production попадает только версия, прошедшая все проверки; ветка `dev` и PR проверяются так же, но не публикуются. Хостинг — GitHub Pages с custom domain, без затрат.
