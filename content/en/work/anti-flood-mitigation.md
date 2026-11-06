---
title: Bot Protection for a Paid API
priority: primary
order: 1
caseUrl: /en/cases/bot-protection/
stack: nginx, fail2ban, nftables, captcha, request queue, incident diagnostics
---

**Problem:** bots were using up the paid daily limit of a receipt-checking service and creating repeated manual response work.

**Action:** added request/IP correlation, captcha, nginx rate limiting, a request queue, fail2ban escalation, and nftables subnet containment with interval sets, in-kernel meter checks, and dynamic sets with timeouts.

**Result:** abuse stopped, manual blocking decreased, and incident diagnostics became clearer.
