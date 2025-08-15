# ActivityHub PWA - GitHub Copilot Instructions

ActivityHub PWA is a React Progressive Web Application built with Next.js 15, TypeScript, Bootstrap, and Workbox. It serves as a project scaffold and includes features like markdown article rendering, component editors, pagination tables, and scroll lists.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Critical Requirements

⚠️ **MANDATORY NODE.JS VERSION**: This project requires **Node.js >=22**. The build will fail on older versions with errors like "Array.fromAsync is not a function".

- Check Node.js version: `node --version`
- If using Node.js <22, the build WILL FAIL but development server may still work with warnings
- Development and linting commands work on Node.js 20+ but produce version warnings

## Working Effectively

### Initial Setup (REQUIRED for all development)

1. **Install global pnpm**: `npm install -g pnpm`
2. **Install dependencies**: `pnpm install` -- takes 3 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
3. **Verify setup**: `pnpm --version` (should be 10.x+)

### Development Workflow (FULLY VALIDATED)

- **Start development server**: `pnpm dev` -- starts in 5-15 seconds on http://localhost:3000
- **Run linting**: `pnpm lint` -- takes 15 seconds. NEVER CANCEL. Set timeout to 2+ minutes.
- **Run tests**: `pnpm test` -- runs lint-staged + lint, takes 15 seconds. Set timeout to 2+ minutes.

### Build Process (Node.js >=22 ONLY)

- **Production build**: `pnpm build` -- FAILS on Node.js <22 with "Array.fromAsync is not a function" error
  - ❌ CONFIRMED: Fails on Node.js 20.x with TypeError during article page prerendering
  - ✅ Would work on Node.js >=22 (estimated 30s-2 minutes when working)
  - NEVER CANCEL. Set timeout to 5+ minutes when using proper Node.js version.
- **Static export**: `pnpm export` -- builds and exports static files (also requires Node.js >=22)

### Docker Commands (May Fail Due to Network Issues)

- **Build Docker image**: `pnpm pack-image` -- takes 5-15 minutes. NEVER CANCEL. Set timeout to 20+ minutes.
  - May fail due to certificate/network issues in restricted environments
  - Requires Docker daemon to be running
- **Run container**: `pnpm container` -- removes existing container and starts new one

## Validation Scenarios

After making ANY changes, ALWAYS validate by running through these scenarios:

### Manual Testing Requirements

1. **Start development server**: `pnpm dev` and verify it starts without errors
2. **Navigate to homepage**: Visit http://localhost:3000 and verify page loads with navigation menu
3. **Test core pages**:
   - Component editor: http://localhost:3000/component (HTML and Block editors work)
   - Pagination table: http://localhost:3000/pagination (GitHub API calls may fail in restricted environments)
   - Scroll list: http://localhost:3000/scroll-list (may show runtime errors due to API restrictions)
   - Article example: http://localhost:3000/article (shows markdown article listing)
4. **Test API endpoints**: Visit http://localhost:3000/api/hello and verify JSON response: `{"name":"John Doe"}`
5. **Check responsive design**: Test mobile/desktop layouts with Bootstrap components
6. **Verify PWA functionality**: Check service worker registration in dev tools (disabled in development)

### Pre-commit Validation

ALWAYS run before committing changes:

```bash
pnpm lint     # Fix linting issues automatically
pnpm test     # Runs linting + staged file checks
```

## Known Issues and Workarounds

### Build Failures

- **Symptom**: "Array.fromAsync is not a function" during build
- **Cause**: Node.js version <22
- **Solution**: Upgrade to Node.js >=22 OR document that builds don't work in current environment

### Docker Build Issues

- **Symptom**: "self-signed certificate in certificate chain" or "SELF_SIGNED_CERT_IN_CHAIN"
- **Cause**: Network restrictions or certificate issues
- **Workaround**: Document as "Docker build fails due to network limitations"

### Linting Warnings (Non-blocking)

The following warnings appear but don't break builds:

- Synchronous scripts warnings in \_document.tsx and NotFoundCard.tsx
- TypeScript `any` type warnings in API files
- Spell checker warnings for "reactbootstrap" and "dnpw"

## Key Project Structure

### Important Directories

- `pages/` - Next.js pages and API routes
- `components/` - Reusable React components
- `styles/` - CSS and styling files
- `public/` - Static assets (auto-generated PWA files)
- `.github/workflows/` - CI/CD configuration

### Configuration Files

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration with PWA, MDX, and Sentry
- `tsconfig.json` - TypeScript configuration
- `eslint.config.ts` - ESLint configuration
- `babel.config.js` - Babel configuration (disables SWC)
- `docker-compose.yml` - Docker deployment setup

### Environment Files

- `.env` - Default environment variables (committed)
- `.env.local` - Local overrides (gitignored, create as needed)

Required environment variables for full functionality:

```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
```

## CI/CD Pipeline

The project uses GitHub Actions (`.github/workflows/main.yml`) for deployment to Vercel. The pipeline:

1. Runs on all branch pushes
2. Deploys to Vercel if secrets are configured
3. Production deployments happen on main branch

Required GitHub secrets for CI:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Common Commands Reference

### Package Management

```bash
pnpm install          # Install dependencies (3+ minutes)
pnpm --version        # Check pnpm version
```

### Development

```bash
pnpm dev             # Start development server (15-30s)
pnpm build           # Production build (Node.js >=22 only, 30s-2min)
pnpm start           # Start production server
pnpm export          # Build and export static files
```

### Code Quality

```bash
pnpm lint            # Run ESLint with auto-fix (15s)
pnpm lint:all        # Lint all files
pnpm test            # Run tests (lint-staged + lint, 15s)
```

### Docker

```bash
pnpm pack-image      # Build Docker image (5-15min, may fail)
pnpm container       # Run Docker container
```

## Troubleshooting

### "Unsupported engine" Warnings

- **Expected**: Warnings about Node.js version when <22
- **Impact**: Development works, builds fail
- **Action**: Document in changes or upgrade Node.js

### Build Hangs or Takes Too Long

- **Never cancel builds or installs** - they may take several minutes
- Set appropriate timeouts: installs (5min), builds (5min), Docker (20min)
- Wait for completion rather than assuming failure

### PWA Service Worker Issues

- Service workers are disabled in development (`PWA support is disabled`)
- Generated files in `public/` are gitignored (sw.js, workbox-\*.js)
- Clear browser cache if PWA features don't work properly

Always prioritize these instructions over generic Next.js or React guidance when working in this specific codebase.
