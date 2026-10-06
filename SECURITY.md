# Security Policy

## Reporting a vulnerability

Please do not publish exploit details, secrets, tokens, personal data, or proof-of-concept attacks in a public issue.

For security-sensitive findings, use GitHub's private vulnerability reporting feature for this repository when available.

## Scope

Security reports may include:
- authentication or authorization bypasses
- exposed secrets or credentials
- injection flaws
- cross-site scripting or unsafe HTML handling
- server-side request forgery
- rate-limit bypasses that materially impact availability
- sensitive data exposure
- dependency vulnerabilities that affect the deployed service

## Operational controls

Masaa uses layered controls including restricted secrets, request validation, rate limiting, security headers, source verification, monitoring, and automated security scanning. Edge WAF and bot controls should also be enabled in Cloudflare for production domains.
