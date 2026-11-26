# UC consent terms, version 0.1

**This is v0.1, a draft for discussion with patients. It is not legally binding yet.**
Attaching these terms to a file records what you want. It cannot stop anyone who has the
file from ignoring them.

Tell us what is wrong or missing through the
[patient feedback form](https://github.com/shagunmistry/ulcerative-colitis/issues/new?template=patient-feedback.yml).
Issues are public, so do not include personal health details.

## The idea

The terms travel with the data. When someone exports their [journal](https://ulcerative-colitis.vercel.app/journal),
the file holds their entries and their terms together.

## Terms object

Schema: [`v0.1/schema.json`](v0.1/schema.json) (JSON Schema 2020-12).

```json
{
  "spec": "uc-consent-terms/0.1",
  "created": "2026-12-01",
  "allowed_uses": ["personal"],
  "denied_uses": ["clinical_care", "academic_research", "commercial_research", "ai_training"],
  "requires_contact_before_use": true,
  "share_derivatives": "must_share_results_back",
  "expires": null,
  "withdrawal": "any_time",
  "contact": null
}
```

| Field | Values | Meaning |
|---|---|---|
| `spec` | `uc-consent-terms/0.1` | Version of this format |
| `created` | `YYYY-MM-DD` | Date the terms were last changed |
| `allowed_uses` | list of uses | What the person allows. **A use not listed here is not allowed.** |
| `denied_uses` | list of uses | What the person explicitly refuses. A use cannot be in both lists. |
| `requires_contact_before_use` | `true` or `false` | Whether the person must be asked before any use beyond personal |
| `share_derivatives` | `must_share_results_back`, `no_requirement`, `not_allowed` | What happens to results made from the data: they must be shared with the person, nothing is required, or nothing may be made from it for others |
| `expires` | `YYYY-MM-DD` or `null` | Last day the terms permit use; `null` means no end date is set |
| `withdrawal` | `any_time` | The person may withdraw at any time |
| `contact` | text or `null` | How to reach the person, if they choose to say |

Uses: `personal` (the person's own use), `clinical_care` (their care team),
`academic_research`, `commercial_research`, `ai_training`.

The default in the journal allows `personal` only.

## Journal export file

```json
{ "spec": "uc-journal-export/0.1", "terms": { }, "entries": [ ] }
```

Each entry needs `id` (letters, digits and hyphens) and `date`. All else is optional.

| Field | Values |
|---|---|
| `stool_frequency` | whole number, 0 to 100 |
| `blood` | `none`, `streaks`, `obvious`, `mostly_blood` |
| `urgency` | whole number, 0 to 3 |
| `pain` | whole number, 0 to 10 |
| `fatigue` | whole number, 0 to 10 |
| `medications` | text |
| `notes` | text |

The fields are for personal tracking. They are not a clinical score.

## Open questions for v0.2

- Should terms differ by field, for example sharing counts but never notes?
- How should withdrawal work once a copy has been shared?
- Who may speak for a child, or for someone who cannot consent?
- Which existing consent vocabularies, such as the GA4GH Data Use Ontology, should this map to?
