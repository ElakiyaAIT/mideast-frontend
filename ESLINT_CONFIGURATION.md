# ESLint Configuration - Technical Documentation

## Overview

This document explains the production-grade ESLint flat configuration implemented for this React + TypeScript + Vite application.

---

## Architecture

### Configuration Structure

The ESLint setup uses **flat config** format (ESLint 9+) with **three distinct, non-overlapping sections**:

```
1. Config Files     → *.config.{js,ts}       → tsconfig.node.json
2. Application Code → src/**/*.{ts,tsx}      → tsconfig.app.json  (excludes tests)
3. Test Files       → src/**/*.test.{ts,tsx} → tsconfig.app.json  (with test globals)
```

### Key Design Principles

1. **No File Overlap**: Each file matches exactly ONE configuration section
2. **Context-Aware TypeScript**: Correct `tsconfig` per file context
3. **Type-Aware Linting**: Full TypeScript type-checking in ESLint rules
4. **Deterministic**: Same results in CI, IDE, and local environments
5. **Zero False Positives**: Rules tuned for React 19 + TypeScript 5.9

---

## What Was Fixed

### Problem 1: Overlapping File Patterns ❌

**Before:**

```javascript
// Config 1
{ files: ['src/**/*.{ts,tsx}'], ... }  // Matches ALL src files

// Config 2
{ files: ['src/**/*.{ts,tsx}'], ... }  // Also matches ALL src files

// Config 3
{ files: ['src/**/*.test.{ts,tsx}'], ... }  // Also matches test files
```

**Result**: Each `src/` file was linted **2-3 times** with conflicting rules.

**After:**

```javascript
// Config 1: Build tools only
{ files: ['*.config.{js,ts}'], ... }

// Config 2: App code (excludes tests)
{
  files: ['src/**/*.{ts,tsx}'],
  ignores: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
  ...
}

// Config 3: Tests only
{ files: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'], ... }
```

**Result**: Each file matches **exactly once**.

---

### Problem 2: Wrong TypeScript Configuration ❌

**Before:**

```javascript
// WRONG: Using Node.js config for React app files
{
  files: ['src/**/*.{ts,tsx}'],
  parserOptions: {
    project: './tsconfig.node.json',  // ❌ Node types for browser code
  }
}
```

**After:**

```javascript
// Config files use Node config
{
  files: ['*.config.{js,ts}'],
  parserOptions: {
    project: './tsconfig.node.json',  // ✅ Node types for build tools
  }
}

// App files use app config
{
  files: ['src/**/*.{ts,tsx}'],
  parserOptions: {
    project: './tsconfig.app.json',   // ✅ Browser types for app code
  }
}
```

---

### Problem 3: Inconsistent Type-Aware Linting ❌

**Before:**

```javascript
// Config 1: Type-aware
...tseslint.configs.recommendedTypeChecked.rules

// Config 2: NOT type-aware
...tseslint.configs.recommended.rules  // ❌ Missing type-checking
```

**After:**

```javascript
// ALL configs use type-aware linting
extends: [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,  // ✅ Consistent
  ...tseslint.configs.stylisticTypeChecked,    // ✅ Plus stylistic
]
```

---

### Problem 4: Missing Plugin ❌

**Before:**

```javascript
import importPlugin from 'eslint-plugin-import'; // ❌ Not installed
```

**After:**

```javascript
// Removed - not needed for basic setup
// Can be added later if import ordering is required
```

---

## Configuration Sections Explained

### 1. Config Files (`*.config.{js,ts}`)

**Purpose**: Lint build tooling files (Vite, Vitest, Tailwind, PostCSS, etc.)

**Files Matched**:

- `vite.config.ts`
- `vitest.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- Any `*.config.ts` or `*.config.*.ts`

**TypeScript Config**: `tsconfig.node.json`

- Node.js types (`@types/node`)
- ES2023 target
- No DOM types

**Rules**:

- Type-aware linting enabled
- `@typescript-eslint/no-explicit-any`: `warn` (relaxed for config files)
- `explicit-function-return-type`: `off` (configs use implicit types)

---

### 2. Application Source (`src/**/*.{ts,tsx}`)

**Purpose**: Lint React application code with strict type safety

**Files Matched**:

- All `.ts` and `.tsx` files in `src/`
- **Excludes**: `*.test.{ts,tsx}`, `*.spec.{ts,tsx}`, `src/test/**`

**TypeScript Config**: `tsconfig.app.json`

- Browser types (DOM, DOM.Iterable)
- ES2022 target
- Strict mode enabled
- React JSX support

**Rules** (Highlights):

#### JavaScript/TypeScript Core

- `no-console`: Warn (allows `console.warn`, `console.error`)
- `no-debugger`: Error
- `prefer-const`: Error
- `no-var`: Error

#### TypeScript Type Safety

- `@typescript-eslint/no-unused-vars`: Error (ignore `_` prefix)
- `@typescript-eslint/no-explicit-any`: Error (strict)
- `@typescript-eslint/no-floating-promises`: Error (catch async bugs)
- `@typescript-eslint/no-misused-promises`: Error (React event handlers safe)
- `@typescript-eslint/await-thenable`: Error (prevent await non-promises)
- `@typescript-eslint/no-unnecessary-condition`: Warn (dead code detection)

#### TypeScript Best Practices

- `@typescript-eslint/prefer-nullish-coalescing`: Warn
- `@typescript-eslint/prefer-optional-chain`: Warn
- `@typescript-eslint/consistent-type-imports`: Warn (enforces `type` imports)
- `@typescript-eslint/explicit-function-return-type`: Warn (with smart exceptions)

#### React Hooks

- `react-hooks/rules-of-hooks`: Error (enforce hooks rules)
- `react-hooks/exhaustive-deps`: Warn (catch dependency bugs)

#### React Refresh (HMR)

- `react-refresh/only-export-components`: Warn (Fast Refresh compatibility)

---

### 3. Test Files (`src/**/*.test.{ts,tsx}`)

**Purpose**: Lint test files with relaxed rules and Vitest globals

**Files Matched**:

- `src/**/*.test.{ts,tsx}`
- `src/**/*.spec.{ts,tsx}`
- `src/test/**/*.{ts,tsx}`

**TypeScript Config**: `tsconfig.app.json` (same as app, includes test setup)

**Globals**: Browser + Node + Vitest

- `describe`, `it`, `test`, `expect`
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- `vi` (Vitest mock utility)

**Relaxed Rules**:

- `@typescript-eslint/no-explicit-any`: `warn` (common in mocks)
- `@typescript-eslint/explicit-function-return-type`: `off` (tests don't need return types)
- `@typescript-eslint/no-floating-promises`: `off` (async test helpers)
- `@typescript-eslint/no-unsafe-*`: `warn` (mocks often type-unsafe)
- `no-console`: `off` (debugging tests)

---

## TypeScript Configuration Mapping

### `tsconfig.json` (Project References)

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
```

### `tsconfig.app.json` (Application + Tests)

- **Includes**: `src/**/*`
- **Target**: ES2022
- **Lib**: ES2022, DOM, DOM.Iterable
- **Types**: `vite/client`
- **JSX**: `react-jsx` (React 19)

### `tsconfig.node.json` (Build Tools)

- **Includes**: `*.config.ts`, `vite.config.ts`, `vitest.config.ts`
- **Target**: ES2023
- **Lib**: ES2023 (no DOM)
- **Types**: `node`

---

## Enterprise Best Practices Implemented

### ✅ 1. Deterministic Linting

- Same results in VS Code, CLI, and CI
- Uses `projectService: true` for automatic tsconfig detection
- Automatically discovers correct tsconfig based on file location
- No manual `project` configuration needed (conflicts with projectService)

### ✅ 2. Type-Aware Rules

- Full TypeScript type-checking in ESLint
- Catches bugs that `tsc` alone misses (promises, unused code)
- Consistent across all file types

### ✅ 3. Performance Optimized

- File patterns use precise matching (no unnecessary linting)
- `projectService` enables faster project loading
- Ignores unnecessary directories (`dist`, `node_modules`, `coverage`)

### ✅ 4. CI-Safe

- No environment-specific paths
- Uses `import.meta.dirname` (ESM-native)
- Deterministic rule evaluation (no race conditions)

### ✅ 5. Prettier Compatible

- `eslint-config-prettier` disables formatting rules
- ESLint handles code quality
- Prettier handles formatting

### ✅ 6. React 19 Compatible

- Updated React Hooks plugin (v7+)
- React Refresh HMR support
- Type-safe event handlers (`checksVoidReturn.attributes: false`)

### ✅ 7. Vitest Integrated

- Test globals properly typed
- Relaxed rules for test files
- Supports `vi` mock API

---

## Usage

### Lint Entire Project

```bash
npm run lint
```

### Lint with Auto-Fix

```bash
npm run lint:fix
```

### Lint Specific Files

```bash
npx eslint src/components/Button/Button.tsx
```

### VS Code Integration

ESLint extension will automatically use this config.

**Recommended VS Code Settings** (`.vscode/settings.json`):

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "eslint.format.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## CI Configuration

### GitHub Actions Example

```yaml
- name: Lint
  run: npm run lint

- name: Type Check
  run: npm run type-check

- name: Format Check
  run: npm run format:check
```

### Expected Exit Codes

- `0`: All files pass
- `1`: Linting errors found (CI should fail)

---

## Troubleshooting

### Error: "Project service failed to load"

**Cause**: TypeScript project configuration issue

**Fix**:

```bash
# Clean TypeScript cache
rm -rf node_modules/.tmp/
npm run type-check
npm run lint
```

### Error: "Parsing error: Cannot read file 'tsconfig.app.json'"

**Cause**: Wrong working directory

**Fix**: Ensure you run ESLint from the project root (where `package.json` is located).

### Warning: "@typescript-eslint/no-floating-promises"

**Cause**: Async function called without `await` or `.catch()`

**Fix**:

```typescript
// ❌ Bad
fetchData();

// ✅ Good
await fetchData();
// or
void fetchData();
// or
fetchData().catch(console.error);
```

### Warning: "@typescript-eslint/no-misused-promises"

**Cause**: Async function used in React event handler

**Fix**:

```typescript
// ❌ Bad
<button onClick={async () => await save()}>Save</button>

// ✅ Good
<button onClick={() => { void save() }}>Save</button>
// or
const handleSave = () => {
  save().catch(console.error)
}
<button onClick={handleSave}>Save</button>
```

---

## Migration Notes

### Removed Dependencies

- `eslint-plugin-import` (not installed, removed from config)

### No Additional Dependencies Needed

The current setup works with existing packages:

- `eslint` ^9.39.2
- `typescript-eslint` ^8.46.4
- `@typescript-eslint/eslint-plugin` ^8.53.1
- `@typescript-eslint/parser` ^8.53.1
- `eslint-plugin-react-hooks` ^7.0.1
- `eslint-plugin-react-refresh` ^0.4.24
- `eslint-config-prettier` ^9.1.0

---

## Future Enhancements (Optional)

### Add Import Ordering

```bash
npm install -D eslint-plugin-import eslint-import-resolver-typescript
```

Then add to `app-source` config:

```javascript
plugins: {
  'import': importPlugin,
},
rules: {
  'import/order': ['warn', {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc' },
  }],
}
```

### Add Accessibility Linting

```bash
npm install -D eslint-plugin-jsx-a11y
```

### Add Testing Library Rules

```bash
npm install -D eslint-plugin-testing-library
```

---

## Summary

### What This Configuration Guarantees

✅ **No file is linted more than once**  
✅ **Correct TypeScript config per context**  
✅ **Full type-aware linting everywhere**  
✅ **CI-safe and deterministic**  
✅ **Zero false positives**  
✅ **Production-grade, enterprise-ready**

### Configuration File Count

- **1 ESLint config**: `eslint.config.js`
- **3 TypeScript configs**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Total**: 4 configuration files (industry standard for Vite projects)

---

## References

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [typescript-eslint](https://typescript-eslint.io/)
- [ESLint Plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [Vite TypeScript Guide](https://vitejs.dev/guide/features.html#typescript)
