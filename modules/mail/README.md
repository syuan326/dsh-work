# Split mail

A DSH bundle that keeps personal and work mail in two isolated spaces.

- Two sidebar pages: **Personal mail** and **Work mail**.
- **Settings → Mail** with a personal and a work tab: mail accounts, categories, tags,
  fetching limits, automatic fetching and model-analysis consent.
- Two separate preset tool sets: `personal_mail_*` and `work_mail_*`. Only the row a preset
  mounts becomes visible to its Agents, and each tool set refuses objects from the other
  space.
- Each space picks its own analysis model from the models already configured in DSH (or follows the DSH global default); the plugin asks for no second provider key.
- Drafts may be written by an Agent, but sending needs the user's confirmation in the mail
  page. The confirmation is bound to the draft version, content and sending account.

See `docs/DETAIL.md` for behavior and security notes.

## Assign tools to presets

The bundle installs three Host rows: the mail services, `personal-mail-tools` and
`work-mail-tools`. Both tool rows start with an empty preset list, so no Agent sees any
mail tool until you assign it.

Open **Settings → Mail → Preset tool access** and check a preset under **Personal tools**
and/or **Work tools**. Only checked presets resolve those tools; a preset without a check
never sees them and cannot call them. The same lists are the `presets` field of each row in
**Plugins**, so either surface works.

A read-only preset can additionally trim actions through the row's `enabledTools`:

```yaml
config:
  presets: [standard]
  enabledTools: [accounts, list, search, read, options]
```

## Tests

```sh
npm test
```

The tests use in-memory stores and mocked IMAP/SMTP; they never touch a real mailbox.
