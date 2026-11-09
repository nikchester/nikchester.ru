---
title: CRM Restore After a Lost Server
priority: primary
order: 3
caseUrl: /en/cases/portal-restore/
stack: restic, rsync, Terraform, Ansible, Yandex Cloud, Bitrix24
---

**Problem:** the hosting provider Beget lost a client's self-hosted Bitrix24 server and said nothing about the data for more than a week.

**Action:** nightly database and file backups to a separate server with a weekly restore check, a new Yandex Cloud server as code (Terraform, Ansible), and the restore as a separate service.

**Result:** the client has its own copy of the data of 2 November, the portal was restored on the new server in 34 minutes, and the domain moved on the same day.
