# Version History

## v0.2.1 - Final Polish & GitHub Release (May 16, 2026)

### Updates
- ✅ **Version Sync** - Aligned package.json with lib/version.ts (v0.2.1)
- ✅ **Documentation Complete** - All features documented and tested
- ✅ **Production Ready** - Stable release ready for deployment

### Technical
- Updated package.json version to 0.2.1
- Finalized VERSION_HISTORY.md
- Ready for GitHub push

---

## v0.2.0 - Enhanced Blueprint Features & IDE Integration (May 16, 2026)

### New Features
- ✅ **Build from Blueprint Button** - One-click download + VS Code integration
- ✅ **Section Copy Icons** - Copy individual sections with dedicated copy buttons in each section header
- ✅ **Back Navigation** - Added back button on form page for better UX
- ✅ **Fixed Full Blueprint Copy/Download** - Verified all sections are included in copy and download operations

### Improvements
- Enhanced BlueprintSection component with individual copy functionality
- Better user feedback with copy confirmation (checkmark icon)
- Improved navigation flow between pages
- All copy/download operations now work correctly with complete content

### Technical
- Added `content` prop to BlueprintSection for individual section copying
- Implemented VS Code URL scheme integration with fallback
- Updated component styling with Tailwind color classes
- Improved button interactions and hover states
- Each section now has markdown-formatted content for copying

---

## v0.1.1 - Stability & Demo Hardening (May 16, 2026)

### Fixes
- CSS token aliases so `var(--text-primary)` works across all pages
- Blueprint section fade-in no longer stuck at `opacity: 0`
- Loading page: single API call guard (no Strict Mode double-fetch)
- Optional form chips can be deselected
- Blueprint persists in `sessionStorage` across refresh
- Parser fallback when Bob response format differs
- Broader Bob API response field extraction
- `.env.example` added; production errors hide internal details
- Download button label matches file name

### Removed
- Redundant docs consolidated into README (later restored on request)

---

## v0.1.0 - Professional Minimalist Design Overhaul (May 16, 2026)

### Design Improvements
- ✅ **Refined Typography** - Increased body text to 16px, hero to 64px, better hierarchy
- ✅ **Enhanced Spacing** - Implemented 8px grid system with generous white space
- ✅ **Improved Color Palette** - Better contrast with refined grays (#999, #666)
- ✅ **Polished Components** - Refined buttons, chips, inputs with better hover states
- ✅ **Smooth Interactions** - Added scale transforms (1.02 hover, 0.98 active)
- ✅ **Better Animations** - Staggered fade-ins with cubic-bezier easing
- ✅ **Refined Borders** - Reduced radius to 6px for buttons/inputs, 24px for chips
- ✅ **Enhanced Focus States** - Added ring effects and better accessibility
- ✅ **Improved Layout** - Better vertical rhythm and content breathing room
- ✅ **Professional Polish** - Every detail refined for premium feel

### Pages Updated
- **Landing Page** - Better typography, spacing, and visual balance
- **Form Page** - Refined inputs, improved chip styling, better layout
- **Loading Page** - Smoother animations and better timing
- **Blueprint Page** - Enhanced readability and section styling

### Components Enhanced
- **Chip** - Better padding, hover effects, scale transforms
- **CodeBlock** - Refined styling, improved copy button
- **BlueprintSection** - Better spacing and hover states

### Technical
- Updated global CSS with new design system
- Implemented consistent transition timing
- Next.js App Router with API route for Bob
- React Context for form state
- TypeScript types for form and blueprint

### Features (Initial Release)
- 7-question project intake form
- IBM Bob blueprint generation (5 sections)
- Copy full blueprint / download markdown
- Server-side API key handling
- Monochrome design system (DM Serif Display + DM Mono)

---

**Made with Bob** 🤖
