# W11.1 Minimal content pass

The owner said the site read as AI-made: too many headings, bylines and extra text in each section. This pass only removes things. No new copy was written. Every fact the brief requires (01-BRIEF.md section 6) is still on the page.

Screenshots: `docs/design/shots/w11/before/` (before) and `docs/design/shots/w11/` (after), at 360 and 1440.

## Home (`/`)

- **Opening:** removed the italic caption under the framed plate. It repeated the photo's alt text and only appeared while scrolling. Shortened the lead, using only its own words, to "Catering and hospitality in Mumbai."
- **Services:** removed the "What we do" label above "Four ways we feed a room." Removed the copper "01-04" numbers on the phone cards and on the desktop list. The copper rule stays as the focus mark, and the desktop name column moved in to take the numbers' space.
- **Occasions marquee:** removed the whole band ("Sangeet / Mehendi / Reception ..."), its pause button, `Marquee.tsx` and its CSS.
- **Food gallery:** removed the "The food" label and the "01 / 06" counter. The dots stay as the swipe cue, now centred. The heading is cut to "Food, service, presentation."
- **Our story, short:** removed the "Our story" label.
- **Event stories:** removed the "Our work" label and the service label on each card. Each card is now photo, title and one line.
- **Plan band:** removed the "Or call [NEEDS CLIENT: phone]" line under the button. The phone number is still in the footer and on the Plan your event page.

## Service pages (all four, one template)

- **Hero:** removed the italic alt-text caption that appeared while scrolling. The hero is now name, one line and one button.
- **What we do:** removed the "What we do" label. Removed the split-heading lead: the heading is now its first sentence only (for example "Weddings are the hardest catering there is."). Each format's text is cut to one of its own sentences. Removed the outline drifting word on desktop and the giant italic word band on phone (`DriftWord.tsx` and its CSS are deleted). The formats keep their title and one sentence.
- **How it works:** removed the "How it works" label, the copper "01-05" step numbers, and the phone line that joined one number to the next. Each step is now a title and one line.
- **Stories:** removed the "Our work" label. Kept the title, "The brief", "What we made" and one "See the work" link.
- **Gallery:** removed the "The food" / "On the day" label and the "01 / 05" counter.
- **Other services:** removed the promise line and the separate "See celebrations"-style link under each one. The service name is now the link (44px tap target), and the photo still links too.
- **Plan band:** removed the "Or call ..." helper line.

## Our work (`/our-work`)

- Removed the "Our work" label (and its copper slash) above the H1.
- Removed the intro paragraph ("Weddings, birthdays, brand launches ... longer, and quieter.").
- Story cards: removed the service label, because the filter already shows the service. Each card is now photo, title and the one-line summary.
- Plan band: removed the "Or call ..." line.

## Event story (`/our-work/<slug>`)

- Removed the service label link and copper slash above the title.
- Removed the summary line under the title, which repeated "What we made". The summary is still used for the card line and the page meta description.
- Removed the two-button row ("See <service>" and "Plan your event"). The Plan band below is now the one plan action.
- Live-counter lines are kept on every story that has one. An earlier draft of this pass cut three of them, and they were restored on the coordinator's instruction.
- Plan band: removed the "Or call ..." line.

## Our story (`/our-story`)

- Removed the labels "Our story", "What we hold to", "The founders" and "How we take a brief". Each section keeps its heading.
- Intro: removed two padding sentences. One was "The company behind it is Foodies Hospitality." (the name stays in the footer copyright and the Terms page). The other was "Each asks for a different kind of attention."
- Values: titles only. Every belief body text is removed, and the heading is shortened to "Things we don’t bend on." (text-balance, so "on." no longer wraps alone at 360).
- How we take a brief: removed the "01-04" numbers and "A rough idea is enough to start."
- Plan band: removed the "Or call ..." line.

## Plan your event (`/plan-your-event`)

- Removed the "Plan your event" label above the H1.
- Removed the second intro sentence ("The kind of event, roughly when ... Nothing needs to be fixed yet.") and "Both work." The H1 and "Send a brief, or just call." remain.
- The "Or get in touch" label above the contact lines is now screen-reader only. It is still the h2 for that block.
- Form (both the single-page form and the phone stepper): removed the City hint ("Where the event is."), the Brief hint ("Optional. The occasion, ..."), the Guests hint ("A range works.") and the line "Everything you typed is still in the form." under the Not sent panel. The aria-describedby references to those hints are removed too.
- Phone stepper: "Step n of 6" is now screen-reader only. The legend stays and can still take focus.

## Shared parts

- **Footer:** removed the closing line "Made for hosts who'd rather be present." and the three column labels (Services, Foodbiz, Contact). The three columns read on their own, and the nav landmarks keep their aria-labels.
- **Services sheet (phone dock):** removed the promise line under each service. Each row is now photo and name.
- **Menu:** no change. It was already links plus one button.
- **Loading screen:** removed the "Catering & hospitality / Mumbai" strapline, the `site.strapline` field and its CSS. It is now the logo and the progress line.
- **Story viewer:** removed the service label, the what-we-made line and the second link ("Plan your event"). Each story is now title and "Read the story". The visible "1 / 5" counter is removed because the progress bars show the position. Its live announcement stays for screen readers.
- **Copper cursor (desktop):** removed the 84px disc reading "View". Over photos and cards it now shows the same small copper ring as over links.
- **Copper page slash** (`PageSlash.tsx` and `.pm-slash` CSS) is deleted. It only sat beside the removed labels.
- **Content and types:** removed the unused fields `label` (section labels), `phoneLine`, `StoryCard.service`, `work.intro`, `planPage.label` / `body`, `footer.closer` and `strapline`, plus the city and brief hints. Removed the `label` prop from `SectionHeading`, the `splitHeading` helper, and the dead CSS for every removed element.

## Coordinator cross-check

A mid-task cross-check from the coordinator changed a few decisions. It restored the live-counter lines, cut belief bodies, the guests hint, "Both work.", the "kept" line, the viewer's what-we-made line and the cursor's "View" disc, made "Step n of 6" screen-reader only, and shortened the opening lead, the gallery heading and the format texts using only existing words. The sections above reflect the final state.

## Kept on purpose

- **The founders' line and its attribution** ("Amar Jog and Kushal Shetty, founders") on Home and Our story. It is a real quote, so it needs the attribution.
- **"The brief" and "What we made" labels** on story pages and service story cards. The brief asks for these by name.
- **Section headings**, including the service gallery heading. Without the gallery intro, the desktop pinned row's pre-JS height would no longer match. That would create a layout shift.
- **The hero lead on Home and the service pages**: the brief asks for "one short line".
- **The Plan band lead** (for example "A date, a rough guest count ... is enough to start."). It is the one line in that band.
- **The contact hint** ("A phone number or an email is enough."). Screen readers use it, through aria-describedby, to learn that only one of the two is needed. The phone stepper uses a plain `<p>`, not a legend, so without the hint that information would be lost.
- **The date hint** ("A month or rough date is fine."), the **"One of the two"** marker and the **"How we reply"** label.
- **The Not sent panel** and its "cannot send yet, please call/email" line.
- **Gallery dots** and **story-viewer progress bars**: they show that the carousel can be swiped.
- **Founder roles** ("Co-founder") and the `[NEEDS CLIENT: founder bios]` placeholder.
- **The services sheet title** ("Services"): it labels the dialog.
- **Legal pages**: unchanged.
- **Alt text, sr-only text, form labels and errors**: unchanged.

## Checks (production build on :3033)

- `npx tsc --noEmit`: passes. Also clean with `--noUnusedLocals --noUnusedParameters`, apart from Next's own generated `.next/dev` types.
- `node scripts/a11y-check.mjs http://localhost:3033`: all checks pass. The first run flagged the new other-service name links as 31px tall. They are now `min-h-11`.
- CLS while scrolling, at 360 and 1440, on all 12 checked pages: 0.0000.
- `scrollWidth` at 360: 360 on every page.
- Banned words (CLAUDE.md list) in `src/`: none.
