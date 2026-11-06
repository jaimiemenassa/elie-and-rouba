# Wedding Invitation Website Starter

A playful, interactive wedding invitation built with HTML, CSS, JavaScript and Supabase.

## 1. Open the website locally

- Extract the ZIP.
- Open the folder in Visual Studio Code.
- Recommended: install the VS Code extension **Live Server**.
- Right-click `index.html` → **Open with Live Server**.

The website works as a visual demo before Supabase is connected.

## 2. Personalize the content

Open `script.js` and edit the `wedding` object near the top:
- `groom` and `bride`
- `dateISO`, `dateLabel`, `fullDate`, and `time`
- `location`, `venue`, `address`, `mapUrl`
- `rsvpDeadline`
- `heroImage` and `galleryImages`

Put your photos in the `images` folder and use their exact filenames. Example:
- `images/couple-main.jpg`
- `images/couple-1.jpg`
- `images/couple-2.jpg`
- `images/couple-3.jpg`

Use JPG, PNG or WebP images. Keep image file sizes reasonable for mobile visitors.

## 3. Create the Supabase database

1. Create a project at https://supabase.com/.
2. Open **SQL Editor** → **New query**.
3. Copy all of `supabase-setup.sql` into the editor and run it.
4. Open **Project Settings → API** (or the API keys area).
5. Copy the Project URL and the publishable key (or legacy anon key).
6. Paste them into `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `script.js`.

Important: the browser key is public by design. Use only the publishable/anon key. Never put the `service_role` or secret key in frontend code.

## 4. Test the RSVP

- Run the site locally.
- Open the invitation and submit a test RSVP.
- In Supabase, open **Table Editor → wedding_rsvps** and confirm the row appears.
- Delete your test response from the dashboard before sharing the live site.

The starter intentionally allows public INSERT only. Visitors cannot read the guest list. An authorized project owner can view responses inside the Supabase dashboard.

## 5. Publish with Vercel

1. Create a GitHub repository and upload the project files.
2. Sign in to https://vercel.com/ and import that repository.
3. Use the default settings for a static site; no build command is needed.
4. Deploy. Vercel will provide a shareable URL.

When you update photos or text, commit and push the changes to GitHub; Vercel redeploys automatically.

## Before sending invitations

- Replace every sample name, date, time, location and image.
- Confirm the wedding date/time and timezone.
- Test the site on a phone.
- Test one accepted RSVP and one declined RSVP.
- Check the database and remove test records.
- Consider adding CAPTCHA/rate limiting before a public launch to reduce spam.
- Do not expose a guest list or admin credentials on the public site.

## Current scope

This starter includes the invitation, cover interaction, countdown, details, gallery and RSVP insert. It does not yet include a custom admin dashboard, RSVP editing, meal choices, plus-one rules, or email notifications; those can be added after the basic version works.
