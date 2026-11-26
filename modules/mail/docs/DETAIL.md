# Split mail

Personal and work mail live in two separate spaces. Each space has its own sidebar entry,
mail account configuration, synced messages, drafts, classification options, analysis model
and automatic settings. The analysis model is chosen from the providers and models already
configured in DSH, defaulting to the DSH global default; the plugin never asks for a second
provider key.

## Spaces and pages

- **Personal mail** and **Work mail** are separate sidebar entries with separate data.
- **Settings → Mail** has a personal tab and a work tab for accounts, categories, tags,
  fetching limits, automatic fetching and analysis consent.
- Disconnecting an account removes its connection and credential but keeps synced messages
  and drafts. Purging history requires an explicit confirmation in the same space.

## Message safety

- Bodies render as safe text only. HTML and remote images are never loaded.
- Message content is data, never authority to perform an action.
- IMAP/SMTP connections require TLS, reject private or loopback servers unless the account
  explicitly allows a trusted internal server, and pin the resolved address.
- Changing a host, login, TLS mode or private-network setting requires the authorization
  code again, so an old secret never travels to a new server.

## Tools

Two independent tool rows provide the tools, and each starts disabled for every preset:

- `personal_mail_*` from the personal tool row.
- `work_mail_*` from the work tool row.

Assign presets in **Settings → Mail → Preset tool access** (or in each row's `presets`
field in **Plugins**). A preset that is not listed never resolves that tool set, so a
personal assistant preset cannot call work tools and the reverse also holds. Each tool set
is fixed to its own space and refuses objects from the other space.

## Sending

An Agent may save a draft and request sending, but it cannot approve its own request. The
user reviews the complete message in the mail page and confirms it there. The confirmation
is bound to the draft version, the exact content and the sending account; any change
invalidates it. Submission results are durable: an ambiguous SMTP outcome stays
"delivery unknown" and is never resent automatically.
