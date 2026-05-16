# Design Improvement Plan - v0.1.0

## 🎯 Goal

Transform the current design into a **truly professional minimalist aesthetic** inspired by world-class design systems like Vercel, Linear, and Apple.

---

## 📊 Current Design Issues (Analysis)

### Landing Page

- ❌ Typography feels cramped and lacks breathing room
- ❌ Button styling is too basic (needs refinement)
- ❌ Footer text is too small and hard to read
- ❌ Missing visual hierarchy and focal points
- ❌ Lacks subtle sophistication

### Form Page

- ❌ Form inputs lack polish and refinement
- ❌ Chip buttons feel flat and unrefined
- ❌ Question labels need better hierarchy
- ❌ Overall spacing feels inconsistent
- ❌ Submit button lacks visual weight

### General Issues

- ❌ Typography scale needs refinement
- ❌ Spacing system is inconsistent
- ❌ Interactive states lack polish
- ❌ Missing subtle animations
- ❌ Color contrast could be improved

---

## 🎨 Design Principles (Professional Minimalism)

1. **Generous White Space** - Let content breathe
2. **Perfect Typography** - Hierarchy, scale, and rhythm
3. **Subtle Interactions** - Micro-animations that feel natural
4. **Refined Details** - Every pixel matters
5. **Consistent System** - Spacing, colors, and patterns

---

## 📐 New Design System

### Typography Scale (Refined)

```
Hero Display:    64px / 4rem    (was 72px - too large)
H1:              48px / 3rem    (was 56px)
H2:              32px / 2rem    (was 32px - keep)
H3:              24px / 1.5rem  (was 24px - keep)
Body Large:      18px / 1.125rem (NEW)
Body:            16px / 1rem    (was 14px - too small)
Body Small:      14px / 0.875rem (was 13px)
Caption:         12px / 0.75rem (was 11px - too small)
```

### Spacing Scale (8px Grid)

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
4xl: 96px  (6rem)
```

### Color Refinements

```
Background:      #000000 (pure black)
Surface:         #0A0A0A (slightly lighter - was #0D0D0D)
Elevated:        #141414 (keep)
Border Default:  #1A1A1A (lighter - was #222222)
Border Hover:    #2A2A2A (lighter - was #333333)
Text Primary:    #FFFFFF (pure white)
Text Secondary:  #999999 (lighter - was #888888)
Text Tertiary:   #666666 (lighter - was #444444)
Accent:          #FFFFFF (keep)
Accent Hover:    #E5E5E5 (slightly darker - was #CCCCCC)
Accent BG:       #141414 (chip selected state)
Code BG:         #0A0A0A (code blocks)
```

### Border Radius

```
Button / Input:  6px
Card:            12px
Chip:            24px (pill)
```

### Motion

```
Fade in:         400ms cubic-bezier(0.4, 0, 0.2, 1)
Hover scale:     1.02
Active scale:    0.98
Shimmer (load):  2s infinite
```

---

## 📄 Page-by-Page Specs

### Landing Page

- Wordmark top-left: `Bob` in mono, tertiary, letter-spaced
- Hero: DM Serif Display, centered, max-width 640px
- Body: two paragraphs, secondary then primary weight
- CTA: full white button on black, 6px radius, arrow in label
- Footer: hackathon + version, tertiary uppercase mono

### Form Page

- Max width 680px, vertical rhythm 48px between questions
- Required fields marked with `*`
- Textarea: surface bg, 1px border, focus ring white
- Chips: multi-select Q2, single-select Q3–6 with toggle-off
- Submit: full-width primary button at bottom

### Loading Page

- Centered layout, robot emoji pulse
- Shimmer progress bar (not percentage — indeterminate)
- Rotating status messages every 2s
- Error state with back-to-form CTA

### Blueprint Page

- Max width 760px
- Section cards: surface, border, staggered fade-in
- Code blocks: left accent border, copy on hover
- Actions row: copy, download, start over

---

## 🧩 Component Guidelines

### Chip

- Unselected: transparent, border, secondary text
- Selected: accent-bg, primary border, primary text
- Hover: border-hover, slight scale

### BlueprintSection

- Serif H2 for section letter (A–E)
- Mono body for content
- No inline opacity that blocks animation end state

### CodeBlock

- Filename bar optional
- Copy button appears on group hover

---

## ✅ Implementation Checklist

- [x] Update `globals.css` with @theme tokens
- [x] Apply typography to all pages
- [x] Refine Chip component
- [x] Refine form inputs and textarea
- [x] Add fade-in animations with delays
- [x] Loading shimmer bar
- [x] Blueprint section cards
- [x] Focus-visible outlines for accessibility
- [x] Custom scrollbar styling

---

## 🔮 Future Design (Post-Hackathon)

- Light mode toggle (optional)
- Print stylesheet for blueprint PDF
- Syntax highlighting in code blocks
- Progress indicator on form (step 1 of 7)

---

**Made with Bob** 🤖
