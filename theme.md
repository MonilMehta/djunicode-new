# DJ Unicode Home Theme

## Purpose
This document captures the visual theme, motion language, and effect systems used by the main home route so future edits stay consistent.

## Scope Covered
- src/app/page.tsx
- src/components/home/home-fade-in.tsx
- src/components/prism/PrismClientWrapper.tsx
- src/components/prism/PrismScene.js
- src/components/prism/Beam.js
- src/components/prism/Reflect.js
- src/components/prism/Prism.js
- src/components/prism/Rainbow.js
- src/components/prism/Flare.js
- src/components/prism/Box.js
- src/components/home/horizontal-narrative-scroll.tsx
- src/components/home/founders-section.tsx
- src/components/home/faculty-section.tsx
- src/components/home/upcoming-events-section.tsx
- src/components/home/featured-projects-section.tsx
- src/app/globals.css (global tokens and shared interaction styling)

## Main Visual Direction
- Base mood: dark, immersive, cinematic.
- Dominant background on home sections: #050505 to #0A0A0A.
- Accent color: #77CE90 (status dots, hover highlights, CTA accents).
- Typography direction:
  - Display: heavy Satoshi-style sans with tight tracking.
  - Typical display clamp range: roughly 3.5rem to 6.5rem.
  - Supporting copy: white with reduced opacity (white/50 to white/70).
- Surface language:
  - Soft borders: white/low alpha or #222 outlines.
  - Large rounded geometry: 24px to 32px radius.
  - Layered gradients and vignette masks for depth.

## Motion Stack
- Framer Motion for section-level and element-level animation.
- @react-three/fiber + custom shaders for hero scene motion.
- @react-three/postprocessing (Bloom + LUT) for cinematic grading.
- CSS transitions and utility animations for hover and pulse micro-interactions.

## Route Composition (Main Page)
The home page is rendered in this sequence:
1. Prism hero (full-screen WebGL scene).
2. Horizontal narrative scroll section (1000vh sticky story).
3. Founders stacked cards section (scroll-coupled sticky scale).
4. Faculty advisor reveal card.
5. Upcoming events cinematic sticky build sequence.
6. Featured projects horizontal scroll section.

## Global Intro Animation
### HomeFadeIn
- Entire page content wraps in a root fade-in.
- Behavior:
  - 100ms mount delay.
  - Opacity 0 -> 1 over 0.5s, easeOut.
- Purpose:
  - Prevent abrupt flash during scroll restoration and observer boot.

## Hero System: Prism Scene
### Wrapper Layer
- Full viewport canvas container with black background and hidden overflow.
- Overlay text in bottom-left using mix-blend-mode:difference.
- Words: "code create", "collaborate" in large display style.

### 3D Scene Core
- Orthographic camera, zoom 70.
- Antialias disabled intentionally for sharp performance-friendly look.
- Lights:
  - Ambient starts at 0 and lerps down.
  - Multiple low-intensity point lights + a spotlight.

### Interactive Ray and Refraction
- Beam + Reflect system computes ray bounces against ray-reactive meshes.
- Prism hitbox is invisible low-poly geometry.
- On ray over prism:
  - Rainbow speed boosted.
  - Rainbow emissive intensity raised.
  - Flare visibility enabled.
- Refraction angle is estimated and used to rotate rainbow and steer spotlight target.

### Dynamic Elements
- Rainbow shader:
  - Time-driven spectral/iridescent effect.
  - Emissive intensity animated by interaction state.
- Flare cluster:
  - Additive streak/glow/dot layers.
  - Child instances drift over time via sin/cos/atan motion.
- Mirror boxes:
  - Hover reaction via emissive color lerp (#454545 -> white).

### Postprocessing
- Bloom: mipmap blur, strong highlight lift.
- LUT: cube LUT from /prism/lut.cube for color grading.

### First-Load Behavior
- Before user interaction, beam target is fixed to a designed start point.
- A short timed prism hit cue runs early to reveal interactivity.

## Horizontal Narrative Scroll (readme + stack)
### Layout Mechanics
- Section height: 1000vh.
- Sticky viewport container with horizontal strip movement.
- Vignette overlay: top/bottom darkening gradient.

### Scroll Phases
1. Phase A (0.00-0.40): readme copy highlight progression.
   - Four word groups transition from muted white to accent colors.
2. Phase B (0.05-0.45 windows): stacked photo cards rise and fade in sequentially.
3. Phase C (0.40-0.56): horizontal strip moves 0vw -> -100vw.
4. Phase D (0.56-0.96): radial icon wheel rotates 120deg -> 0deg.
   - Icons counter-rotate to remain upright.

### Stack Wheel Behavior
- Icons distributed on an arc (radius-based geometry).
- Hover effects:
  - Slight scale-up.
  - Accent drop-shadow glow.
  - Label tint shift to green.

## Founders Section (Stacked Scroll Cards)
### Structure
- Total section height = founders.length * 100vh.
- Each card is sticky and offset by index * 40px for stacked depth.

### Motion
- Per-card scale tied to local scroll range:
  - 1.00 -> 0.92 across each card segment.
- Result:
  - Layered deck compression while next cards move in.

### Card Effects
- Large rounded cards, subtle border, deep shadow.
- Image edge blends with gradient masks.
- Social links have scale-on-hover microinteraction.

## Faculty Section (Single Feature Reveal)
### Entry Motion
- Heading: fade in + y:-20 -> 0.
- Main card: fade in + y:40 -> 0.

### Timing
- Heading duration ~0.7s.
- Card duration ~0.8s.

### Visual Treatment
- Founder-style visual language reused:
  - dark gradient split panel,
  - rounded container,
  - image blend gradients.

## Upcoming Events Section (Cinematic Build Sequence)
### Layout Mechanics
- Section height: 340vh.
- Sticky full-screen stage.
- Scroll progress smoothed with spring.

### Explicit Build Pipeline
- 0.00-0.12: top rule draws left -> right.
- 0.10-0.28: image clip-path wipe reveal.
- 0.26-0.38: eyebrow appears (opacity + y).
- 0.35-0.55: title lines rise in (line-stagger logic).
- 0.50-0.65: CTA appears (opacity + y).
- 0.70-0.80: bottom rule / secondary elements reveal.
- 0.72-0.82: view-past-events pill fades in.

### Responsive Modes
- Landscape image mode (desktop): wide cinematic strip (21:9).
- Portrait/mobile mode: two-column then single-column fallback.

### Reusable Animated Parts
- LineReveal component: scaleX draw animation.
- TitleLines component: per-line reveal with line window offsets.

### Micro-Effects
- Accent status dot uses pulse.
- CTA icon nudges and scales on hover.

## Featured Projects Section (Pinned + Horizontal Rail)
### Layout Mechanics
- Section height scales by number of projects: projects.length * 100vh.
- Sticky split layout:
  - left side pinned text/CTA,
  - right side horizontally shifting project rail.

### Motion
- Scroll progress spring-smoothed.
- Desktop rail transform: x 0% -> -68%.

### Card Hover Effects
- Cover image zoom:
  - duration 1s,
  - custom cubic-bezier ease.
- Overlay appears with faded backdrop and rising icon chip.
- Desktop CTA uses subtle scale and glow growth on hover.

## Shared Interaction Patterns
- Common transition window: 180ms to 300ms for micro states.
- Hover style trends:
  - slight lift/scale,
  - accent color swap to #77CE90,
  - stronger glow or border contrast.
- Repeated pulse motif:
  - status dots and active indicators.

## Color + Effects Inventory
### Core Colors
- Base dark: #050505, #0A0A0A, #111, #222.
- Accent green: #77CE90.
- Secondary accents in narrative text highlights:
  - #FF6B6B,
  - #38BDF8,
  - #34D399,
  - #F59E0B.

### Lighting / Postprocessing
- Bloom with high threshold smoothing to keep highlights selective.
- LUT grading from /prism/lut.cube for final tone.
- Additive blending used in flare/rainbow/beam visuals.

## Implementation Notes
- Main page currently imports some data/helpers that are not rendered in the final JSX path (for example stats, featuredProjects, stacks variables in page.tsx). Keep or clean based on roadmap.
- Featured projects currently checks window.innerWidth in transform style; if this is revised, prefer a reactive media query hook for cleaner SSR/client consistency.

## Editing Rules for Future Work
1. Keep section backgrounds in the same black family unless intentionally introducing a new chapter.
2. Preserve display typography rhythm (large clamps, tight tracking) for section titles.
3. Prefer scroll-coupled motion over autoplay motion on large sections.
4. Use accent green only for active/interactive states, not as base text color.
5. Keep motion smooth and readable; avoid abrupt transforms unless used as a deliberate punctuation moment.
6. Any new hero-level visual effect should include a static fallback and avoid blocking first paint.
