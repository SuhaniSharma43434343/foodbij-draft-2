# Foodbiz v2 - taste spec (W1.3, 2026-10-14)

Status: proposal for the owner's approval before the build (step 2).

## Idea

**A printed dinner menu for a Mumbai host: a fine, high-contrast serif on white and deep navy,
the food photographed and laid out like a magazine spread.** Copper appears only where you can act
or where the logo would, so every page stays calm and the one thing to do (plan your event) is
always obvious.

Why it answers the review: the old site read "data company" and its phone type was "not refined".
This look takes its luxury from restraint: one fine serif, generous space, large photographs, almost
no decoration, and type sized for a 360px screen first.

## Type

Tested side by side at 360px (four pairs: `docs/design/shots/fonts-360.png`, page `/sketch/fonts`).

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display (headlines, service names, pull lines) | **Cormorant** (Google, OFL) | 500, 600; italic 500 | The most refined of the four at 360px; 500 keeps hairlines whole on phone screens. Italic for one short line per page at most. |
| Text (body, nav, labels, buttons, forms) | **Jost** (Google, OFL) | 400, 500 | A geometric sans that echoes the round O's and straight strokes of the FOODB/Z wordmark, so type and logo read as one family. |

Rejected: Bodoni Moda (spacing breaks at small optical sizes: "W e"), Instrument Serif (narrow,
newsy rather than opulent), Fraunces (soft and bookish, friendly not luxury).

### Scale (phone first; fluid up to 1440px)

| Token | Size | Line-height | Face |
|---|---|---|---|
| display-xl (home opening) | clamp(2.375rem, 1.7rem + 3.2vw, 5rem) | 1.04 | Cormorant 500, letter-spacing -0.01em |
| display-l (H1 on inner pages) | clamp(2.125rem, 1.6rem + 2.6vw, 4.25rem) | 1.06 | Cormorant 500 |
| display-m (section and service titles) | clamp(1.75rem, 1.4rem + 1.6vw, 3rem) | 1.1 | Cormorant 500 |
| lead | clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem) | 1.5 | Jost 400 |
| body | 16px (17px from 768px) | 1.6 | Jost 400, max 62ch, left-aligned |
| label | 12px, uppercase, letter-spacing 0.18em | 1.3 | Jost 500 |
| button / nav | 13px, uppercase, letter-spacing 0.14em | 1 | Jost 500 |

Rules: headlines wrap to at most 3 lines at 360px; no centred paragraphs over 2 lines; body never
lighter than 400 or smaller than 16px.

## Colour

| Token | Hex | Role |
|---|---|---|
| navy | `#0B1C2D` | All text on light grounds; the dark bands (food gallery, closing band, footer). Reads as black, softer than black on photos. |
| copper | `#B87333` | Primary button fill (white label), the active nav marker, thin rules, the small "01-04" service numerals. Never body text. |
| copper-deep | `#8F5523` | Copper for small text or links on white when needed (4.5:1+). |
| paper | `#FFFFFF` | Page ground. |
| mist | `#F4F1EC` | One alternate light band (a faint warm grey, not cream, not "shaadi" beige). |
| ink-70 | navy at 72% | Secondary text on white. |

Contrast (measured): navy on white 17.2:1; copper-deep on white 6.0:1; white on copper 3.8:1, so
copper buttons use 13px uppercase 500-weight labels with wide tracking and are at least 48px tall,
and copper is never used for body text. Copper on navy is 4.5:1, fine for numerals and rules on the
dark bands. If the owner wants AA for button labels too, use `#A0612A` (5.0:1) as the fill.

Proportion: about 70% white, 25% navy, under 5% copper. Photography carries the colour.

## Layout and components

- **Header:** logo left (white version over the opening image, navy on white), a visible "Menu"
  word plus icon on the right at 44px tall on phone; on desktop: Services, Our work, Our story and
  an outlined copper "Plan your event" button. Inline SVG icons only.
- **Opening:** full-bleed still (`cartier-07`, portrait crop on phone) with a navy gradient at the
  bottom, the display-xl line, one lead line and the copper button. Later swap for a plating loop
  (muted, poster image, pause button, still-only under reduced motion).
- **Services:** the heart of the home page. Phone: four stacked cards (4:5 image, numeral, name,
  two sentences, text link). Desktop: alternating split rows, image 7 columns, text 5.
- **Food gallery:** navy band; phone is a horizontal swipe row with scroll-snap (no long stack);
  desktop is an asymmetric grid with big gaps, no captions, no borders, no rounded corners.
- **Event stories:** cards with photo, service label and the brief in one line.
- **Closing band:** navy, "Tell us about your event", copper button, phone `[NEEDS CLIENT]`.
- **Sticky phone bar:** a slim copper "Plan your event" bar, hidden over the opening and the
  closing band; pages carry bottom padding equal to its height.
- Square corners everywhere. Thin 1px rules in navy at 12%. No shadows, no chips, no icons in
  service lists, no chef hats or crossed cutlery.

## Photography

Picks and reasons: `docs/design/photo-picks.md`. One grade for every real photo: slightly warm,
lifted blacks, light grain, tight crops on food and hands. AI images (opening loop, gourmet
sit-downs, office dining, extra food close-ups) follow the same grade and are listed in NOTES.md.

## Motion

Almost none: a 400ms fade-up on section entry, image hover zoom of 2% on desktop, and nothing at
all under `prefers-reduced-motion`. No parallax, no scroll-jacking, no counters.
