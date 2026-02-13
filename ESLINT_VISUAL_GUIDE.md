# ESLint Configuration - Visual Guide

Visual diagrams to understand the ESLint setup at a glance.

---

## File Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PROJECT ROOT                                 │
│                                                                      │
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │ vite.config.ts │  │ vitest.config.ts│  │ tailwind.config │     │
│  │ postcss.config │  │ *.config.ts     │  │ *.config.*.ts   │     │
│  └────────┬───────┘  └────────┬────────┘  └────────┬────────┘     │
│           │                   │                     │              │
│           └───────────────────┼─────────────────────┘              │
│                               │                                     │
│                               ▼                                     │
│                    ┌──────────────────────┐                        │
│                    │  ESLint Config #1    │                        │
│                    │  "config-files"      │                        │
│                    │  tsconfig.node.json  │                        │
│                    └──────────────────────┘                        │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                     src/ DIRECTORY                             │ │
│  │                                                                 │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │ │
│  │  │ App.tsx     │  │ hooks/      │  │ components/ │           │ │
│  │  │ main.tsx    │  │ useAuth.ts  │  │ Button.tsx  │           │ │
│  │  │ routes/     │  │ redux.ts    │  │ ...         │           │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │ │
│  │         │                │                 │                   │ │
│  │         └────────────────┼─────────────────┘                   │ │
│  │                          │                                     │ │
│  │                          ▼                                     │ │
│  │               ┌──────────────────────┐                        │ │
│  │               │  ESLint Config #2    │                        │ │
│  │               │  "app-source"        │                        │ │
│  │               │  tsconfig.app.json   │                        │ │
│  │               └──────────────────────┘                        │ │
│  │                                                                 │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │ │
│  │  │ App.test.tsx│  │ *.spec.tsx  │  │ test/       │           │ │
│  │  │ *.test.ts   │  │ setup.ts    │  │ helpers.ts  │           │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │ │
│  │         │                │                 │                   │ │
│  │         └────────────────┼─────────────────┘                   │ │
│  │                          │                                     │ │
│  │                          ▼                                     │ │
│  │               ┌──────────────────────┐                        │ │
│  │               │  ESLint Config #3    │                        │ │
│  │               │  "test-files"        │                        │ │
│  │               │  tsconfig.app.json   │                        │ │
│  │               │  + Vitest globals    │                        │ │
│  │               └──────────────────────┘                        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Configuration Decision Tree

```
                        ┌─────────────────┐
                        │  File to Lint   │
                        └────────┬────────┘
                                 │
                  ┌──────────────┼──────────────┐
                  │              │              │
           ┌──────▼──────┐  ┌───▼────┐  ┌─────▼─────┐
           │ Root config? │  │ In src/│  │ In src/   │
           │ *.config.ts  │  │ *.ts(x)│  │ *.test.*  │
           └──────┬───────┘  └───┬────┘  └─────┬─────┘
                  │              │              │
                  │              │              │
           ┌──────▼────────┐    │              │
           │ Config #1     │    │              │
           │ (Node types)  │    │              │
           └───────────────┘    │              │
                                │              │
                         ┌──────▼──────┐       │
                         │ Is test?    │       │
                         │ *.test.ts   │       │
                         └──────┬──────┘       │
                                │              │
                       ┌────────┴────────┐     │
                       │                 │     │
                    ┌──▼──────┐    ┌────▼─────▼──┐
                    │ Config #2│    │ Config #3   │
                    │ (Browser)│    │ (Test env)  │
                    └──────────┘    └─────────────┘
```

---

## TypeScript Configuration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      tsconfig.json                               │
│                  (Project References Only)                       │
│                                                                   │
│  ┌──────────────────────┐         ┌──────────────────────┐     │
│  │ references:          │         │ references:          │     │
│  │ tsconfig.app.json    │         │ tsconfig.node.json   │     │
│  └──────────┬───────────┘         └──────────┬───────────┘     │
└─────────────┼──────────────────────────────────┼────────────────┘
              │                                  │
              │                                  │
    ┌─────────▼─────────┐           ┌───────────▼──────────┐
    │ tsconfig.app.json │           │ tsconfig.node.json   │
    ├───────────────────┤           ├──────────────────────┤
    │ Target: ES2022    │           │ Target: ES2023       │
    │ Lib: DOM         │           │ Lib: ES2023 (no DOM) │
    │ JSX: react-jsx    │           │ Types: @types/node   │
    │ Types: vite/client│           │                      │
    │                   │           │                      │
    │ Includes:         │           │ Includes:            │
    │ - src/**/*        │           │ - *.config.ts        │
    │                   │           │ - vite.config.ts     │
    │ Used by:          │           │ - vitest.config.ts   │
    │ ├─ ESLint #2      │           │                      │
    │ └─ ESLint #3      │           │ Used by:             │
    │                   │           │ └─ ESLint #1         │
    └───────────────────┘           └──────────────────────┘
```

---

## ESLint Rule Application

```
┌──────────────────────────────────────────────────────────────────┐
│                     ESLint Configuration                          │
└───────────┬──────────────────────────────────────────────────────┘
            │
            │  All configs get:
            │  ├─ js.configs.recommended
            │  └─ tseslint.configs.recommendedTypeChecked (type-aware)
            │
    ┌───────┴───────────────────────────────────────┐
    │                                               │
┌───▼─────────────┐  ┌──────────────────┐  ┌───────▼──────────┐
│ Config #1       │  │ Config #2        │  │ Config #3        │
│ (config-files)  │  │ (app-source)     │  │ (test-files)     │
├─────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Relaxed rules:  │  │ Strict rules:    │  │ Relaxed rules:   │
│                 │  │                  │  │                  │
│ ✓ no-explicit-  │  │ ✓ no-explicit-   │  │ ~ no-explicit-   │
│   any: warn     │  │   any: error     │  │   any: warn      │
│                 │  │                  │  │                  │
│ ✗ explicit-     │  │ ~ explicit-      │  │ ✗ explicit-      │
│   function-     │  │   function-      │  │   function-      │
│   return: off   │  │   return: warn   │  │   return: off    │
│                 │  │                  │  │                  │
│ ✗ React rules   │  │ ✓ react-hooks    │  │ ✗ React rules    │
│                 │  │ ✓ react-refresh  │  │                  │
│                 │  │                  │  │                  │
│ ✗ no-console    │  │ ~ no-console     │  │ ✗ no-console     │
│                 │  │   (warn)         │  │   (off)          │
│                 │  │                  │  │                  │
│                 │  │ ✓ Type-safety    │  │ ~ Type-safety    │
│                 │  │   (strict)       │  │   (relaxed)      │
└─────────────────┘  └──────────────────┘  └──────────────────┘

Legend:
✓ = Strict enforcement (error)
~ = Warning level
✗ = Disabled
```

---

## Linting Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                         npm run lint                              │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Read eslint.config.js │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Scan all .ts/.tsx     │
              │  (except ignored)      │
              └────────────┬───────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │ Config   │   │ App      │   │ Test     │
     │ Files    │   │ Files    │   │ Files    │
     └────┬─────┘   └────┬─────┘   └────┬─────┘
          │              │              │
          │              │              │
          ▼              ▼              ▼
     ┌─────────────────────────────────────────┐
     │  Load respective tsconfig:              │
     │  - tsconfig.node.json                   │
     │  - tsconfig.app.json                    │
     │  - tsconfig.app.json                    │
     └──────────────────┬──────────────────────┘
                        │
                        ▼
     ┌─────────────────────────────────────────┐
     │  Run type-aware linting:                │
     │  - Parse TypeScript                     │
     │  - Check types                          │
     │  - Apply rules                          │
     └──────────────────┬──────────────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
     ┌──────────┐           ┌──────────┐
     │  Errors  │           │   Pass   │
     │ (exit 1) │           │ (exit 0) │
     └──────────┘           └──────────┘
```

---

## VS Code Integration Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    User Opens .tsx File                           │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  VS Code ESLint Ext    │
              │  reads:                │
              │  - eslint.config.js    │
              │  - .vscode/settings    │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Determine which       │
              │  ESLint config applies │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Load TypeScript       │
              │  project (tsconfig)    │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Show inline errors    │
              │  (red squiggly lines)  │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  User saves file       │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Auto-fix enabled?     │
              │  (codeActionsOnSave)   │
              └────────┬───────────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
     ┌──────────┐         ┌──────────┐
     │  Auto-   │         │  No      │
     │  Fix     │         │  Action  │
     └────┬─────┘         └──────────┘
          │
          ▼
     ┌──────────┐
     │  Prettier│
     │  Format  │
     └──────────┘
```

---

## Rule Severity Visual

```
                        RULE SEVERITY

    OFF (0)           WARN (1)           ERROR (2)
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│             │   │     ⚠️       │   │     ❌       │
│  No action  │   │  Yellow      │   │  Red line   │
│             │   │  underline   │   │             │
│  Ignored    │   │  Warning     │   │  Blocks     │
│             │   │  (doesn't    │   │  commit     │
│             │   │   fail CI)   │   │  Fails CI   │
└─────────────┘   └─────────────┘   └─────────────┘

Example usage:
├─ Config files:
│  └─ @typescript-eslint/no-explicit-any: WARN
│
├─ App files:
│  └─ @typescript-eslint/no-explicit-any: ERROR
│
└─ Test files:
   └─ @typescript-eslint/no-explicit-any: WARN
```

---

## Type-Aware vs Non-Type-Aware Rules

```
┌──────────────────────────────────────────────────────────────────┐
│                     NON-TYPE-AWARE RULES                          │
│                                                                   │
│  ✓ Fast (no TypeScript compilation)                              │
│  ✓ Syntax-based only                                             │
│                                                                   │
│  Examples:                                                        │
│  - no-console                                                     │
│  - prefer-const                                                   │
│  - no-var                                                         │
│  - react-hooks/rules-of-hooks                                    │
└───────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                     TYPE-AWARE RULES                              │
│                                                                   │
│  ~ Slower (requires TypeScript compilation)                      │
│  ✓ Understands types                                             │
│  ✓ Catches more bugs                                             │
│                                                                   │
│  Examples:                                                        │
│  - @typescript-eslint/no-floating-promises                       │
│  - @typescript-eslint/no-misused-promises                        │
│  - @typescript-eslint/await-thenable                             │
│  - @typescript-eslint/no-unnecessary-condition                   │
│  - @typescript-eslint/prefer-nullish-coalescing                  │
│                                                                   │
│  Requires:                                                        │
│  └─ parserOptions.project: './tsconfig.json'                     │
└───────────────────────────────────────────────────────────────────┘

Our setup uses BOTH everywhere! ✅
```

---

## Before vs After Architecture

### BEFORE (Broken)

```
src/App.tsx
    │
    ├─► Config #1 (tsconfig.node.json) ❌ WRONG
    │   └─ Type-aware: ✓
    │
    └─► Config #2 (tsconfig.app.json) ✅ CORRECT
        └─ Type-aware: ✗ (missing)

Result: Conflicting lints, wrong types, inconsistent behavior
```

### AFTER (Fixed)

```
src/App.tsx
    │
    └─► Config #2 (tsconfig.app.json) ✅ CORRECT
        └─ Type-aware: ✓

vite.config.ts
    │
    └─► Config #1 (tsconfig.node.json) ✅ CORRECT
        └─ Type-aware: ✓

src/App.test.tsx
    │
    └─► Config #3 (tsconfig.app.json + Vitest) ✅ CORRECT
        └─ Type-aware: ✓

Result: Each file linted once, correct types, consistent behavior ✅
```

---

## File Count Summary

```
┌──────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION FILES                            │
├───────────────────────────┬──────────────────────────────────────┤
│ ESLint                    │ 1 file (eslint.config.js)            │
├───────────────────────────┼──────────────────────────────────────┤
│ TypeScript                │ 3 files (tsconfig.json,              │
│                           │          tsconfig.app.json,          │
│                           │          tsconfig.node.json)         │
├───────────────────────────┼──────────────────────────────────────┤
│ VS Code                   │ 2 files (settings.json,              │
│                           │          extensions.json)            │
├───────────────────────────┼──────────────────────────────────────┤
│ Documentation             │ 5 files (ESLINT_CONFIGURATION.md,    │
│                           │          ESLINT_MIGRATION_GUIDE.md,  │
│                           │          ESLINT_QUICK_REFERENCE.md,  │
│                           │          ESLINT_VISUAL_GUIDE.md,     │
│                           │          REFACTORING_SUMMARY.md)     │
├───────────────────────────┼──────────────────────────────────────┤
│ Total                     │ 11 files                             │
└───────────────────────────┴──────────────────────────────────────┘
```

---

## Quick Decision Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│  I want to...                         │  I should...            │
├───────────────────────────────────────┼─────────────────────────┤
│  Understand the architecture          │  Read this file         │
├───────────────────────────────────────┼─────────────────────────┤
│  See what changed from before         │  ESLINT_MIGRATION_      │
│                                       │  GUIDE.md               │
├───────────────────────────────────────┼─────────────────────────┤
│  Fix a specific lint error            │  ESLINT_QUICK_          │
│                                       │  REFERENCE.md           │
├───────────────────────────────────────┼─────────────────────────┤
│  Understand rules and troubleshooting │  ESLINT_                │
│                                       │  CONFIGURATION.md       │
├───────────────────────────────────────┼─────────────────────────┤
│  Get executive summary                │  REFACTORING_           │
│                                       │  SUMMARY.md             │
├───────────────────────────────────────┼─────────────────────────┤
│  Configure VS Code                    │  .vscode/settings.json  │
│                                       │  (auto-applied)         │
└───────────────────────────────────────┴─────────────────────────┘
```

---

**This visual guide supplements the technical documentation with diagrams for quick understanding.**
