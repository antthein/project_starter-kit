# Version History

## v0.2.7 - Build from Blueprint Enhancement & .env.example (May 17, 2026)

### New Features
- ✅ **VS Code Integration** - "Build from Blueprint" button now downloads file AND attempts to open VS Code
- ✅ **.env.example File** - Added comprehensive environment variable template with all provider options
- ✅ **Better Developer Experience** - Users can see all available env vars without exposing real API keys

### Changes
- Updated download handler to be async and trigger VS Code protocol (`vscode://`)
- Created `.env.example` with placeholders for watsonx, Anthropic, OpenAI, and demo mode
- Added helpful comments in `.env.example` for each provider configuration

### Technical
- Modified `handleDownload` in blueprint page to open VS Code after download
- Added 500ms delay between download and VS Code trigger for better UX
- Graceful fallback if VS Code protocol is not available

---

## v0.2.6 - Start Over Confirmation Modal (May 17, 2026)

### New Features
- ✅ **Confirmation Modal** - Added "Are you sure?" confirmation dialog when clicking "Start over"
- ✅ **Improved Button Layout** - Moved "Start over" button to the right side with `ml-auto`
- ✅ **Better UX** - Prevents accidental data loss with confirmation step

### UI Changes
- Modal with backdrop blur matching current design system
- Two-button confirmation: "Yes, start over" (accent) and "Cancel" (surface)
- Modal appears for both "Start over" button and "Create another project" link
- Smooth fade-in animation for modal appearance

### Technical
- Added `showConfirmModal` state management
- Created inline confirmation modal component
- Updated both "Start over" triggers to use confirmation flow
- Modal uses existing design tokens (border, surface, accent colors)

---

## v0.2.5 - UI Simplification (May 17, 2026)

### Changes
- ✅ **Simplified Button Layout** - Removed redundant "Build from Blueprint" button with VS Code integration
- ✅ **Updated Download Button** - Changed "Download blueprint (.md)" to "🚀 Build from Blueprint" with accent styling
- ✅ **Cleaner UX** - Streamlined action buttons to focus on core functionality (download, copy, start over)

### Technical
- Removed `handleBuildInVSCode` function from blueprint page
- Updated download button to use primary accent styling (bg-accent)
- Maintained download functionality while improving visual hierarchy

---

## v0.2.4 - Blueprint Parsing Fix (May 17, 2026)

### Bug Fixes
- 🐛 **Fixed Section Overlap** - Resolved issue where blueprint sections were showing repetitive content
- ✅ **Improved Regex Patterns** - Enhanced section parsing to properly detect markdown headers with # symbols
- ✅ **Better Content Separation** - Each section now displays only its intended content without overlap

### Technical
- Updated regex patterns in `parseBlueprint` function to use `#{1,2}` for proper markdown header detection
- Fixed lookahead patterns to prevent content bleeding between sections
- Improved section boundary detection for both numbered and markdown-style headers

---

## v0.2.3 - Claude Model Update (May 16, 2026)

### Updates
- ✅ **Claude Model** - Updated default Anthropic model to claude-haiku-4-5-20251001
- ✅ **Model Configuration** - Improved model selection with environment variable support

### Technical
- Updated lib/ai/providers/anthropic.ts with new default model
- Maintained backward compatibility with ANTHROPIC_MODEL env var override

---

## v0.2.2 - AI Provider Improvements & Error Handling (May 16, 2026)

### Improvements
- ✅ **Enhanced Error Messages** - Better error hints for API configuration issues
- ✅ **Improved AI Provider Detection** - Auto-detect Anthropic, OpenAI, or watsonx from env vars
- ✅ **Better Error Handling** - More informative error messages in loading page
- ✅ **Model Configuration** - Support for custom Anthropic models via ANTHROPIC_MODEL env var
- ✅ **Personal Touch** - Added signature "ah" in top right corner

### Technical
- Updated error handling in API route with specific hints for common issues
- Improved AI provider auto-detection logic in lib/ai/types.ts
- Enhanced Anthropic provider with configurable model and max tokens
- Better error display in loading page with detailed messages

---

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
