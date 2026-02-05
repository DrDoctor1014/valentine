# Brady's Valentine Surprise — Design Guidelines

## 1. Brand Identity

**Purpose**: A private, romantic gift experience for Sara on her first Valentine's Day with Brady. Not a utility app, but a digital love letter.

**Aesthetic Direction**: Soft romantic luxury — imagine opening a velvet jewelry box. Creamy pastels, handwritten elegance, slow graceful motion. Everything feels precious and hand-crafted, never generic or tech-forward.

**Memorable Element**: The progressive gift unwrapping experience that feels like real surprise gifts, culminating in a bloomable digital flower bouquet Sara can keep forever.

## 2. Navigation Architecture

**No Authentication Required** — Single-user intimate experience.

**Navigation Type**: Stack-Only (linear emotional journey)

**Screen Flow**:
1. Welcome Screen (optional soft intro)
2. Gift Selection Screen (main hub)
3. Love Note Reveal Screen (modal)
4. Gift Card Reveal Screen (modal)
5. Music Video Screen (modal)
6. Final Bouquet Screen (full-screen takeover after all gifts opened)

All reveal screens are native modals that dismiss back to Gift Selection until all three are opened, then auto-transition to Final Bouquet.

## 3. Screen-by-Screen Specifications

### Welcome Screen (Optional)
- **Purpose**: Soft greeting to set romantic mood
- **Layout**:
  - No header
  - Centered content: "For Sara 💕" in display font
  - Subtitle: "Three gifts await you..."
  - Continue button at bottom
  - Top inset: insets.top + Spacing.xl, Bottom inset: insets.bottom + Spacing.xl
- **Background**: Gradient from pale pink to cream with fixed (non-transparent) floral illustration corners

### Gift Selection Screen
- **Purpose**: Present three identical gift boxes in shuffled positions
- **Layout**:
  - Transparent header with "Valentine's Day 2026" centered
  - Top inset: headerHeight + Spacing.xl
  - Three gift box illustrations in horizontal row (center-aligned, evenly spaced)
  - Each box is tappable with subtle scale-press animation (0.95 scale)
  - Instructional text above: "Choose any gift you'd like..."
  - Bottom inset: insets.bottom + Spacing.xl
- **Component Behavior**:
  - Boxes shuffle position on mount but LOGIC tracks which reveal order (first tap = love note, second = gift card, third = video)
  - Opened boxes fade to 50% opacity and become non-interactive
- **Empty State**: N/A (always shows three boxes)

### Love Note Screen (Modal)
- **Purpose**: Display Brady's personal message
- **Layout**:
  - Full-screen modal with close button (X) top-right
  - Card-style container (rounded corners, drop shadow)
  - Decorative SOLID heart/floral graphics at top (no transparency)
  - Message text (multi-paragraph)
  - Signature: "Love, Brady" in script font
  - Top/bottom insets: Spacing.xl (modal handles safe area)
- **Background**: Soft gradient or solid cream with SOLID petal graphics in corners

### Gift Card Screen (Modal)
- **Purpose**: Reveal $50 Amazon gift card code
- **Layout**:
  - Full-screen modal with close button top-right
  - Card design mimicking gift card aesthetic
  - Hidden code section with "Tap to Reveal" button
  - Once revealed: code visible + "Copy Code" button below
  - Celebratory message: "For little treats and big smiles — Love, Brady"
  - SOLID sparkle/heart graphics around card (no transparency)
  - Top/bottom insets: Spacing.xl
- **Component**: Code reveal triggers subtle confetti burst (SOLID colored shapes that fall, not transparent)

### Music Video Screen (Modal)
- **Purpose**: Play Brady's music video
- **Layout**:
  - Full-screen modal with close button top-right
  - Video player centered (16:9 aspect ratio)
  - Play/pause controls
  - Caption below: "A little song for you. — Love, Brady"
  - Top/bottom insets: Spacing.xl
- **Background**: Solid dark gradient to highlight video

### Final Bouquet Screen (Full Takeover)
- **Purpose**: Emotional climax — digital flower bouquet keepsake
- **Layout**:
  - No header or close button (full immersive experience)
  - Bouquet illustration centered
  - Text overlay: "For you, Sara — these are your flowers 🌸"
  - Subtext: "Our first Valentine's — Feb 14, 2026"
  - Bottom actions: "Save as Image" and "Share" buttons (side-by-side)
  - Top inset: insets.top + Spacing.xl, Bottom inset: insets.bottom + Spacing.xl
- **Animation**: Bouquet scales in (0.8 to 1.0) with SOLID hearts/petals rising from bottom (no transparency — use gradient fade to background color at top edge)
- **Background**: Solid soft pink gradient

## 4. Color Palette

- **Primary**: #FFB6C1 (rose pink)
- **Secondary**: #FFE4E1 (misty rose)
- **Accent**: #FFD700 (pale gold)
- **Background**: #FFF5F7 (creamy white with pink tint)
- **Surface**: #FFFFFF (pure white for cards)
- **Text Primary**: #4A3133 (warm dark brown)
- **Text Secondary**: #8B7177 (dusty rose)
- **Success**: #E6B8C3 (muted pink for reveals)

## 5. Typography

**Display Font**: Satisfy (Google Font) — for headings, signatures, romantic moments
**Body Font**: Lato (Google Font) — clean, legible for paragraphs

**Type Scale**:
- Display: Satisfy, 36px, letterSpacing: 0.5
- Title: Satisfy, 24px
- Heading: Lato Bold, 18px
- Body: Lato Regular, 16px, lineHeight: 24px
- Caption: Lato Regular, 14px, color: Text Secondary

## 6. Assets to Generate

**CRITICAL**: All assets must use SOLID colors with NO TRANSPARENCY. If transparency is needed for layering, use gradient fades to the background color instead.

1. **icon.png** — App icon: wrapped gift box with pink bow (SOLID background)
2. **splash-icon.png** — Same as icon
3. **gift-box-closed.png** — Wrapped gift box illustration (SOLID, no transparent shadows)
4. **gift-box-open.png** — Opened gift box (SOLID)
5. **love-note-top-decor.png** — Heart/floral decoration for love note (SOLID pink/gold shapes)
6. **gift-card-sparkles.png** — Sparkle/shine graphics around gift card (SOLID gold/pink)
7. **flower-bouquet.png** — Full bouquet illustration for final screen (SOLID, vibrant pinks/greens)
8. **confetti-heart.png** — Single heart shape for confetti animation (SOLID rose pink, 50x50px)
9. **confetti-sparkle.png** — Star/sparkle shape for confetti (SOLID gold, 40x40px)
10. **petal-1.png** — Petal shape for animations (SOLID pink, 30x30px)
11. **petal-2.png** — Alternate petal shape (SOLID light pink, 30x30px)
12. **welcome-floral-corner.png** — Decorative corner floral (SOLID for welcome screen background)

**WHERE USED**:
- icon/splash: Device home screen and app launch
- gift-box-closed/open: Gift Selection Screen
- love-note-top-decor: Love Note Screen header
- gift-card-sparkles: Gift Card Screen decoration
- flower-bouquet: Final Bouquet Screen centerpiece
- confetti/petal assets: Animation layers (animate in/out using position and scale, fade using opacity to background color)
- welcome-floral-corner: Welcome Screen corners