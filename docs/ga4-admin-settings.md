# GA4 Admin settings — swandigitalsolutions.com

Settings to apply in the Google Analytics 4 property that uses Measurement ID
**`G-FK2EM3ZH1P`**. The website code cannot change these; they are made in the
GA4 interface by someone with **Editor** (or higher) access to the property.

Google occasionally renames menu items. If a label differs, search the Admin
page for the setting name shown in bold.

---

## 1. Redact data — required

Why: GA4 records the full page URL with every page view. The website itself never
puts personal data in URLs, but a link shared elsewhere could, for example
`…/?name=Asha&phone=98…`. Redaction removes such values before GA4 stores them.

Path: **Admin → Data collection and modification → Data streams →** select the
web stream for `https://www.swandigitalsolutions.com` → **Redact data**.

1. Turn on **Email** redaction (masks anything that looks like an email
   address in URLs). Leave it on.
2. Turn on **Query parameters** redaction and add these parameter names
   (GA4 accepts up to 10):

   | Parameter | Reason |
   |---|---|
   | `name` | Person's name |
   | `email` | Email address (also covered by email redaction) |
   | `phone` | Phone number |
   | `mobile` | Phone number |
   | `tel` | Phone number |
   | `message` | Free-text message |
   | `address` | Postal address |
   | `token` | Access tokens in shared links |

   Do **not** add `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` or
   `utm_content` — they carry campaign information, not personal data.
3. Click **Save**.

Check: open **Test data redaction** on the same screen and enter
`https://www.swandigitalsolutions.com/?name=Test&utm_source=check`.
The preview should show `name=(redacted)` and keep `utm_source=check`.

Redaction applies to data collected **after** it is switched on.

## 2. Google signals — keep OFF

Path: **Admin → Data collection and modification → Data collection**.
**Google signals data collection** should stay **off**. The website also
disables it in code (`allow_google_signals: false`).

## 3. Ads personalisation — keep OFF

Path: **Admin → Data collection and modification → Data collection →
Advanced settings to allow for ads personalisation**. Leave ads
personalisation disabled for all regions. The website sends
`allow_ad_personalization_signals: false` and consent `ad_* = denied`.

## 4. Data retention — choose and record

Path: **Admin → Data collection and modification → Data retention**.

- **Event data retention**: GA4 offers **2 months** (default) or **14 months**.
  Choose the shortest period that still meets your reporting needs. 2 months is
  the more privacy-protective option; 14 months allows year-on-year comparisons
  in Explorations. Standard reports are not affected by this setting.
- Leave **Reset user data on new activity** at your preference.

The Privacy Policy (section 8) refers to "the retention period set in our
Google Analytics account", so it stays accurate whichever option you choose.

## 5. Enhanced measurement — review

Path: **Data streams →** web stream → **Enhanced measurement** (gear icon).

- **Page views**: keep **on**. The website relies on the automatic page view
  (one per page load). Inside page views → *Show advanced settings*,
  **Page changes based on browser history events** can stay on; testing showed
  no extra page views from the site's in-page `#section` links.
- **Scrolls**: optional. On = a `scroll` event when a visitor reaches 90% of a page.
- **Outbound clicks**, **Site search**, **Form interactions**,
  **Video engagement**, **File downloads**: optional. None of these send form
  contents. Turn off any you do not need.

## 6. Internal traffic — recommended

To stop your own visits inflating reports:

1. **Data streams →** web stream → **Configure tag settings → Show more →
   Define internal traffic** → add the office's public IP address(es).
2. **Admin → Data collection and modification → Data filters** → set the
   **Internal Traffic** filter to **Active** (it starts in *Testing*).

Alternatively, staff can click **Decline** in the site's analytics notice, which
stops analytics in that browser.

## 7. Search Console link — optional

**Admin → Product links → Search Console links** to see Google search queries
alongside GA4 data, once the Search Console property for
`https://www.swandigitalsolutions.com` is verified.

---

## 8. Consent settings page — what to expect

Path: **Admin → Data collection and modification → Consent settings**.

The website uses **Basic Consent Mode v2**: Google Analytics loads only after a
visitor clicks **Allow**, and each hit then carries consent signals
(all four types denied by default, `analytics_storage` updated to granted;
ads types stay denied).

- "Consent signals inactive" should change to active only **after the release
  is live in production** and consenting visitors arrive; allow a day or more.
- Visitors who decline send nothing at all, so GA4 cannot measure a true
  consent rate or model their behaviour. Some consent-rate notices (especially
  per region, e.g. EEA) may keep showing or report insufficient data. This is
  expected with Basic mode and does not indicate a fault.
- Ads-related signals will show as denied by design.
- If warnings persist, check **Realtime** with the **Hostname** dimension for
  any other site sending data to `G-FK2EM3ZH1P` without consent signals.

## Verifying after deployment

1. Open the website in a private window, click **Allow** in the analytics notice.
2. In GA4: **Reports → Realtime**. Your visit should appear within a minute.
3. For detail, enable **Admin → DebugView** using the Google Analytics
   Debugger browser extension.
4. Click **Analytics preferences** in the footer → **Decline**; no further
   events should arrive from that browser.

## Notes

- Visitors who decline or ignore the notice are not counted, so GA4 totals will
  be lower than actual traffic. This is expected with consent-first analytics.
- Analytics only runs on `www.swandigitalsolutions.com`; Vercel previews and
  local builds never send data.
