# Reservation incident recovery (lagazelledor.ch)

## What changed

- The public reservation API reports success only after a successful insert in MySQL.
- A booking stays pending regardless of SMTP acceptance; only the restaurant can confirm.
- Missing DB configuration or a failed DB insert returns 503 with a call-the-restaurant message.
- Mail errors are reported separately. A failed notification does not erase a stored request; the customer is told to call.
- Credentials are no longer embedded in the current source code.

## Required production environment variables (Vercel)

Configure securely in Vercel, never commit values to Git:

- DATABASE_URL: mysql://NEW_USER:URL_ENCODED_NEW_PASSWORD@REACHABLE_HOST:3306/DATABASE_NAME
  The host must be reachable from Vercel. 127.0.0.1 and localhost cannot reach Hostinger MySQL.
  For Hostinger, confirm external MySQL connections are supported and configure allowlist/network rules.
- DATABASE_SSL=true when remote DB TLS is supported (recommended).
- SMTP_HOST (e.g. smtp.titan.email after verifying the mailbox provider)
- SMTP_PORT=587 for STARTTLS, or 465 for TLS
- SMTP_USER and SMTP_PASSWORD: freshly rotated mailbox credentials
- SMTP_FROM: a verified sender identity
- RESERVATION_NOTIFY_EMAILS: comma-separated restaurant notification inboxes
- ADMIN_JWT_SECRET: random high-entropy secret, at least 32 characters

Apply variables to Production; configure an isolated Preview database and email inbox for tests.

## Security incident

Old MySQL and SMTP passwords were embedded in a public GitHub repository.
Rotate BOTH secrets at the providers immediately; invalidate their previous values and review access.
Deleting old credentials from the latest code does NOT remove secrets from Git history.

## Safe validation and rollout

1. With correct test DB configuration, GET /api/reservations must return 200; 503 signals DB unavailability. This request does not write any data.
2. Run npm ci, npm test, npm run lint, npm run typecheck and npm run build.
3. In an isolated test environment only, submit one booking; verify exactly one row with status=pending and one notification.
4. With SMTP disconnected, the DB record remains pending and the customer is told to call.
5. With DB disconnected, POST returns 503, sends no notification, and never falsely acknowledges success.
6. Confirm only authenticated admins can update the status.
7. After updating rotated env variables and deploying production, inspect runtime logs and delivery results.

Do not merge/deploy before credentials are rotated and a remote reachable MySQL host is configured.
