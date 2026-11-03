---
name: Nikita Chaturov
title: DevOps Engineer
location: Gyumri, Armenia
email: nikchester01@gmail.com
telegram: https://t.me/nikchester
github: https://github.com/nikchester
linkedin: https://www.linkedin.com/in/nikita-chaturov-8625a5281/
---

Full-time. Not open to relocation; available for occasional business travel.

Citizenship: Russia. No work permit required in Armenia (EAEU).

## Summary

System Administrator with experience in Linux infrastructure automation, CI/CD, and service operations. Since January 2024, I have independently managed the company's infrastructure. Seeking a DevOps role focused on Linux, automation, and deployment.

Work with Ansible, Terraform, Docker, GitLab CI/CD, Prometheus, Grafana, and Loki. Automate recurring operations, maintain development and production environments, and investigate incidents. Maintain diagrams, operating procedures, and runbooks.

## Core Skills

- Automation and CI/CD: Ansible, Terraform, Bash, Python, Git, GitLab, GitLab CI/CD.
- Containers and web services: Docker, Docker Compose, Nginx, HAProxy, Traefik, TLS/SSL.
- Monitoring and logs: Prometheus, Grafana, Loki, Promtail, Zabbix, metrics exporters, and alerting.
- Servers and networking: Linux, Debian, Ubuntu, Proxmox VE, Yandex Cloud, MikroTik, WireGuard, OpenVPN, DNS, Bind9.
- Data and backups: MySQL/MariaDB, PostgreSQL, Redis, Yandex Object Storage, and restore testing.
- Security and documentation: SSH keys, nftables/iptables, fail2ban, Wiki.js, diagrams, and troubleshooting procedures.

## Work Experience

### Wclik, Kazan

System Administrator | January 2024 - Present

Responsible for the company's entire infrastructure. I administer Proxmox VE daily. I manage around 15 servers and VMs across four providers and infrastructure for 170+ websites.

#### CI/CD and Service Deployment

- Administer GitLab and maintain build and deployment pipelines for frontend and Java services in development and production environments.
- Use Docker and Docker Compose for image builds, network isolation, and non-root execution. Configured access controls and protected GitLab CI/CD variables.
- Built infrastructure for receipt-checking service from scratch: Docker, Nginx, GitLab CI/CD, Ansible deployment, monitoring, and logs.

#### Terraform and Proxmox VE

- Provision Proxmox VE VMs from cloud-init templates and LXC containers with Terraform. Moved repeated configuration into shared modules.
- Terraform creates the resources; Ansible roles then install and configure services.

#### Automation for a 170+ Website Platform

- Wrote idempotent Ansible playbooks and roles to deploy HestiaCP, Nginx, PHP-FPM, fail2ban, and metrics exporters.
- Automated domain, DNS zone, and database creation, website migration, bulk SSL certificate issuance, and reCAPTCHA setup.
- Tuned MariaDB for the platform's workload. Configured Yandex Object Storage backups, retention policies, and backup failure alerts.
- Test backups by restoring them in a test environment. Server deployment and routine operations are defined in playbooks and scripts.

#### Monitoring and Incident Investigation

- Deployed Prometheus, Grafana, Loki, Promtail, and node, nginx, and blackbox exporters. Configured alerts for availability, HTTP status codes, certificate expiry, load, and backup failures.
- Revised alert thresholds, schedules, and templates to reduce noise.
- Investigated external API limit exhaustion incidents in receipt-checking service. Added request_id and IP logging, SmartCaptcha, rate limiting, a request queue, and fail2ban.
- The observed API limit exhaustion incidents stopped after these changes. Documented troubleshooting and incident handling in a runbook.

#### Proxmox VE and Service Migrations

- Deployed an office Proxmox VE server. Migrated GitLab, WireGuard VPN, Wiki.js, Vaultwarden, GLPI, and monitoring from cloud infrastructure.
- Configured subdomains, reverse proxies, and backups for the migrated services.
- Separately migrated Bitrix24 to a VDS with RAID1 NVMe storage and FreePBX between Yandex Cloud, Aeza, and Beget.
- Prepared backups and a test environment before migrations. Completed the migrations without data loss.

#### Team and Contractors

- Conducted a technical interview and onboarded a new employee. Created a responsibility map for delegation.
- Work with developers and external contractors. Assign tasks to contractors and review their work and documentation.
- Maintain runbooks, diagrams, and the Wiki.js knowledge base so another engineer can take over the work.

#### Ongoing Operations

Administer MikroTik routing, a backup internet connection, WireGuard/OpenVPN, DNS, proxies, and database access. Write Bash and Python utility scripts.

## Education

Kazan National Research Technical University named after A. N. Tupolev - KAI. Information Systems and Technologies. Part-time studies in progress; expected graduation in 2028.

KTK KNITU. Applied Informatics, Programmer Technician. Completed secondary vocational education in 2023.

## Home Lab

Separate from employment: self-hosted service testing, basic Kubernetes study, and an Ollama deployment in my home lab. No production Kubernetes experience claimed.

## Languages

Russian: Native. English: A2, Elementary.
