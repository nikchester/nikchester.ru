---
title: "Bot protection and a night hosting outage"
summary: Bots ate the paid daily limit of receipt checks. I closed the service to bots, described the server as code and added monitoring that caught a night hosting outage.
relatedWorkSlug: anti-flood-mitigation
stack: Docker, Ansible, nginx, fail2ban, nftables, captcha, request queue, Prometheus, Grafana
---

```text
users and bots
  -> captcha, limits, queue
  -> nginx and fail2ban
  -> nftables
  -> app in a closed Docker network
  -> daily limit used by real people only
```

## Problem

The service checks receipts through an external provider. The provider gives a fixed number of checks per day.

From December 2025, bots used up this limit. Real users got errors until the next day. The server was set up by hand, and there was no test copy.

## What I did

- Recorded each request with its source. This showed how the bots worked.
- Added a captcha, a per-user request limit and a queue. They stop bots before the paid check.
- Added automatic blocks for sources that send too many requests.
- Packed the service in Docker. Only the website is open; the database and internal parts are in a closed network.
- Described the server with Ansible roles and in March 2026 built a test environment.
- In February 2026 connected the service to Prometheus and Grafana: an alert when the site is down for more than 5 minutes.

## Result

- The bot attacks on the paid limit stopped.
- Real users can check receipts again.
- The server and a test copy can be built from code.

## Night outage, 2 November 2026

- 02:41 Moscow time the site stopped answering. Short drops of 1-2 minutes came first; they did not trigger an alert.
- 02:46 a critical alert reached the team chat.
- 09:36-10:00 I checked DNS from three public services, the domain payment, and the server directly from five points in four countries.
- Cause: a full outage at the hosting provider, both its DNS and its servers. Our setup had no error.
- I found a hidden risk: domain, DNS and server at one provider. My plan: move DNS, backups and a reserve server to other providers.

## More

- [Bot protection case, PDF](/assets/cases/en/01-bot-protection.pdf)
- [Night outage case, PDF](/assets/cases/en/04-night-outage.pdf)

I do not publish exact rules, thresholds, addresses or logs.
