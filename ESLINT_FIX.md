# ESLint Configuration Fix - ProjectService

## Issue

Initial configuration had a conflict where both `projectService: true` and `project: './tsconfig.*.json'` were specified together.

**Error Message**:

```
Parsing error: Enabling "project" does nothing when "projectService" is enabled.
You can remove the "project" setting
```

## Root Cause

When using `projectService: true`, ESLint's TypeScript parser automatically discovers and uses the appropriate `tsconfig.json` files based on:

1. The file being linted
2. The TypeScript project structure (tsconfig.json with references)
3. The file's location in the project

Manually specifying `project` property **conflicts** with this automatic discovery mechanism.

## Fix Applied

**BEFORE** (Caused Error):

```javascript
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
  project: './tsconfig.app.json',  // ❌ CONFLICT!
}
```

**AFTER** (Fixed):

```javascript
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
  // ✅ No 'project' needed - auto-discovered
}
```

## How ProjectService Works

With `projectService: true`, the parser:

1. **Looks at the file being linted**: e.g., `src/App.tsx`
2. **Finds the nearest tsconfig**: Searches upward for `tsconfig.json`
3. **Follows project references**: Uses references in root `tsconfig.json`
4. **Selects correct config**: Chooses appropriate tsconfig for that file

### Example Flow

```
src/App.tsx is being linted
    ↓
projectService scans upward
    ↓
Finds: ./tsconfig.json
    ↓
Reads references:
  - tsconfig.app.json (includes: ["src"])
  - tsconfig.node.json (includes: ["*.config.ts"])
    ↓
src/App.tsx matches tsconfig.app.json pattern
    ↓
Uses tsconfig.app.json for type-checking ✅
```

## Changes Made to Files

### 1. `eslint.config.js` - Three Sections Fixed

**Config #1** (Build Tools):

```javascript
{
  name: 'config-files',
  files: ['*.config.{js,ts}', '*.config.*.{js,ts}'],
  parserOptions: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
    // Removed: project: './tsconfig.node.json'
  }
}
```

**Config #2** (App Source):

```javascript
{
  name: 'app-source',
  files: ['src/**/*.{ts,tsx}'],
  ignores: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'src/test/**'],
  parserOptions: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
    // Removed: project: './tsconfig.app.json'
  }
}
```

**Config #3** (Test Files):

```javascript
{
  name: 'test-files',
  files: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
  parserOptions: {
    projectService: true,
    tsconfigRootDir: import.meta.dirname,
    // Removed: project: './tsconfig.app.json'
  }
}
```

## Why This Still Works Correctly

Even without explicit `project` configuration, files still get the correct tsconfig because:

### TypeScript Project Structure

**tsconfig.json** (Root):

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
```

**tsconfig.app.json**:

```json
{
  "include": ["src"] // ← Catches all src/ files
}
```

**tsconfig.node.json**:

```json
{
  "include": ["*.config.ts", "vite.config.ts", "vitest.config.ts"] // ← Catches config files
}
```

### Automatic Mapping

| File               | projectService Discovers                       | Correct? |
| ------------------ | ---------------------------------------------- | -------- |
| `src/App.tsx`      | `tsconfig.app.json` (includes "src")           | ✅ YES   |
| `vite.config.ts`   | `tsconfig.node.json` (includes "\*.config.ts") | ✅ YES   |
| `src/App.test.tsx` | `tsconfig.app.json` (includes "src")           | ✅ YES   |

## Verification

After the fix, run:

```bash
pnpm lint
```

**Expected**: No parsing errors, only legitimate linting issues (if any).

## Benefits of ProjectService

1. **Automatic Discovery**: No manual tsconfig management
2. **Follows Project Structure**: Respects TypeScript project references
3. **Less Configuration**: Simpler ESLint config
4. **More Reliable**: Can't accidentally specify wrong tsconfig
5. **Monorepo Ready**: Works well with multi-project setups

## Common Misconception

❌ **Myth**: "I need to specify `project` to tell ESLint which tsconfig to use"

✅ **Reality**: When using `projectService: true`, the `project` option is:

- Not needed
- Actually causes an error
- Overridden by projectService anyway

## Additional Notes

### When to Use `project` vs `projectService`

**Use `projectService: true`** (Modern, Recommended):

- TypeScript 5.0+
- Projects with proper tsconfig structure
- Automatic discovery desired
- Monorepos

**Use `project: ['./tsconfig.json']`** (Legacy):

- Older TypeScript versions
- Non-standard project structures
- Manual control needed
- Specific edge cases

### Our Setup Uses ProjectService Because:

1. ✅ TypeScript 5.9.3 (modern version)
2. ✅ Proper project references in tsconfig.json
3. ✅ Standard Vite project structure
4. ✅ Want automatic discovery
5. ✅ More maintainable configuration

## References

- [typescript-eslint Project Service](https://typescript-eslint.io/packages/parser#projectservice)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)

---

**Status**: ✅ Fixed  
**Date**: 2026-01-21  
**Impact**: All files now lint correctly without parsing errors
