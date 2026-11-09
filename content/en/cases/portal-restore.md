---
title: "The hosting lost the CRM server. I restored the portal from a backup."
summary: A client's Bitrix24 server was lost at the hosting provider Beget. Nightly backups with a restore check, a new Yandex Cloud server as code, and a portal restore in 34 minutes.
relatedWorkSlug: portal-restore
stack: restic, rsync, systemd, Percona Server, Terraform, Ansible, Yandex Cloud, Bitrix24, Proxmox
---

```text
client server at Beget
  -> nightly backup of database and files (pull, 01:00)
  -> backup server outside Beget, restic
  -> weekly restore check
  -> new server in Yandex Cloud (Terraform, Ansible)
  -> restored portal
```

## Problem

The client kept a self-hosted Bitrix24 server at the hosting provider Beget. The full portal worked on this server: CRM, chats with customers, tasks and business processes.

On 2 November 2026 Beget had a large outage. On 3 November the nightly backup could not connect to the client server. For more than a week Beget says nothing about the data on this server. Most likely, the data is lost.

## What I did

- In September 2026 I built a backup system. Every night it pulls the portal database and files to a separate server outside Beget. The client server cannot delete its own backups.
- Once a week the system checks the backup by itself: it loads the database into a temporary MySQL and counts the tables. On 8 November the check confirmed: the backup of 2 November can be restored, the database has 1768 tables.
- On 9 November I wrote the new server as Terraform code and created it in Yandex Cloud in 41 seconds. I raised the cloud quotas in advance.
- I wrote the Bitrix server setup as Ansible code. I found and went around a bug of the official installer on the cloud image.
- During the copy, the network card of the office backup server failed. From a console photo I found the cause and made the fix permanent.
- I ran the restore as a separate service. A VPN or SSH drop does not stop it.

## Result

- The backup saved the data: Beget cannot return it for more than a week, but the client has its own copy of 2 November.
- 5.4 GB of files and the portal database are on the new server. The restore took 34 minutes.
- The domain moved to the new server on the same day.
- The new server, its setup and the restore are code. A repeat move is a few commands.

## More

- [Case with real screenshots, PDF](/assets/cases/en/05-portal-restore.pdf)

I do not publish the client name, server addresses or private data.
