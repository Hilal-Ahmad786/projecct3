---
name: PakSoft 2026 Core
colors:
  surface: '#f7faf5'
  surface-dim: '#d7dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5ef'
  surface-container: '#ebefea'
  surface-container-high: '#e5e9e4'
  surface-container-highest: '#e0e4de'
  on-surface: '#181d1a'
  on-surface-variant: '#3f4943'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eef2ec'
  outline: '#6f7a72'
  outline-variant: '#bec9c0'
  surface-tint: '#0e6c49'
  primary: '#004c31'
  on-primary: '#ffffff'
  primary-container: '#006644'
  on-primary-container: '#8ee1b6'
  inverse-primary: '#85d7ad'
  secondary: '#4e5e82'
  on-secondary: '#ffffff'
  secondary-container: '#c4d4fe'
  on-secondary-container: '#4b5b7f'
  tertiary: '#702b2a'
  on-tertiary: '#ffffff'
  tertiary-container: '#8e4240'
  on-tertiary-container: '#ffc1bd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f4c8'
  primary-fixed-dim: '#85d7ad'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#b6c6f0'
  on-secondary-fixed: '#071b3b'
  on-secondary-fixed-variant: '#364669'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#3d0508'
  on-tertiary-fixed-variant: '#77302f'
  background: '#f7faf5'
  on-background: '#181d1a'
  surface-variant: '#e0e4de'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  bento-gap: 20px
---

## Brand & Style
The design system is engineered for a high-trust, enterprise SaaS environment, specifically catering to technical stakeholders and decision-makers in the software industry. It balances professional stability with modern agility.

The visual direction follows a **Modern / Corporate** aesthetic with a heavy emphasis on **Bento-grid** modularity. The interface communicates precision through technical monospaced accents and reliability through a grounded, high-contrast color palette. Every element is designed to evoke a sense of "structured innovation"—where complex data is housed in approachable, soft-edged containers.

## Colors
The palette is rooted in **PakSoft Green**, used primarily for brand signaling and primary actions to denote growth and vitality. **Strategic Blue** provides the structural weight, used for navigation and deep-contrast text to establish authority.

**Electric Gold** is reserved strictly for high-priority Call-to-Actions (CTAs) and critical focus states, ensuring they pop against the cooler primary tones. The background architecture utilizes **Soft Mint** for success states and positive data visualizations, while **Cloud 50** (#F8FAFC) serves as the primary canvas color for menu backgrounds and workspace areas to reduce eye fatigue.

## Typography
The typography system uses **Inter** as the foundational UI face, specifically utilizing Medium and Semi-Bold weights to achieve the "Soft" appearance requested. Headlines should feature slight negative letter-spacing to maintain a tight, professional look.

**JetBrains Mono** is the functional workhorse for technical data, code snippets, and specific numerical metrics. This distinction ensures users can immediately differentiate between system narrative and raw technical output. All mono-spaced text should be rendered with slightly increased tracking to ensure maximum legibility at small sizes.

## Layout & Spacing
This design system utilizes a **Bento-style fluid grid**. Layouts are composed of modular "cards" that reorganize based on screen real estate. 

- **Desktop:** 12-column grid with a 40px outer margin and 24px gutters.
- **Bento Spacing:** Internal module gaps are set to 20px, creating a distinct "nested" feel where components feel grouped but separate.
- **Rhythm:** Use 8px increments for all padding and internal element spacing to maintain mathematical consistency across the SaaS platform.

## Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional drop shadows. Surfaces are defined by clear hierarchies:
1.  **Canvas:** The base layer (Cloud 50).
2.  **Bento Cards:** White (#FFFFFF) surfaces with a subtle 1px stroke (Strategic Blue at 8% opacity).
3.  **Active Elements:** A subtle 4px "Soft Mint" glow may be used to indicate focus on success-related containers.

Avoid heavy shadows; instead, use 2px solid offsets in Strategic Blue for a "Neo-SaaS" look if a component needs to feel "lifted" from the grid.

## Shapes
The shape language is defined by a "Friendly-Professional" radius. While the core UI uses `0.5rem` (8px) for standard inputs and buttons, the **Bento Cards** utilize `1.5rem` (24px) for the outer corners to create the signature modern SaaS silhouette. This large radius on containers softens the high-contrast color palette, making the dense technical data feel more accessible.

## Components
- **Bento Cards:** Containers with 24px rounded corners, white backgrounds, and 24px internal padding. They should always align to the 20px gap grid.
- **Primary Buttons:** Solid PakSoft Green with white Inter Bold text. 8px corner radius.
- **CTA Buttons:** Solid Electric Gold with Strategic Blue text for maximum contrast and legibility. Reserved for "Upgrade," "Submit," or "Deploy."
- **Data Tables:** Headers in Strategic Blue (10% opacity) with text in JetBrains Mono. Use zebra-striping with Soft Mint at 5% opacity.
- **Input Fields:** 1px border in Strategic Blue (20% opacity). When focused, the border transitions to PakSoft Green with a 2px width.
- **Chips/Status:** Use Soft Mint backgrounds with PakSoft Green text for "Active" or "Success" labels.
- **Iconography:** Line-based, 2px stroke width, using Strategic Blue for default states and PakSoft Green for active states.