# ESLint Quick Reference

Quick guide for common ESLint scenarios and fixes.

---

## Commands

```bash
# Lint entire project
npm run lint

# Lint with auto-fix
npm run lint:fix

# Lint specific file
npx eslint src/components/Button.tsx

# Lint with debug output
npx eslint src/App.tsx --debug

# Check what files will be linted
npx eslint "src/**/*.{ts,tsx}" --max-warnings=0
```

---

## Common Errors & Fixes

### 1. `@typescript-eslint/no-floating-promises`

**Error**: Promise returned is not handled

```typescript
// ❌ Bad
fetchData();

// ✅ Good
await fetchData();
void fetchData();
fetchData().catch(console.error);
```

### 2. `@typescript-eslint/no-misused-promises`

**Error**: Async function in event handler

```typescript
// ❌ Bad
<button onClick={async () => await save()}>Save</button>

// ✅ Good
<button onClick={() => void save()}>Save</button>

const handleSave = () => {
  save().catch(console.error)
}
<button onClick={handleSave}>Save</button>
```

### 3. `@typescript-eslint/no-unnecessary-condition`

**Error**: Condition always true/false

```typescript
// ❌ Bad
const x: string = 'hello'
if (x) { ... }  // Always true!

// ✅ Good
const x: string | undefined = maybeString()
if (x) { ... }  // Can be undefined
```

### 4. `@typescript-eslint/prefer-nullish-coalescing`

**Error**: Should use `??` instead of `||`

```typescript
// ❌ Bad
const name = user.name || 'Anonymous';

// ✅ Good
const name = user.name ?? 'Anonymous';
```

### 5. `@typescript-eslint/prefer-optional-chain`

**Error**: Can use optional chaining

```typescript
// ❌ Bad
const email = user && user.profile && user.profile.email;

// ✅ Good
const email = user?.profile?.email;
```

### 6. `@typescript-eslint/consistent-type-imports`

**Error**: Should use `type` keyword for type imports

```typescript
// ❌ Bad
import { User, Post } from './types';

// ✅ Good
import type { User, Post } from './types';

// Mixed (value + type)
import { fetchUser, type User } from './api';
```

### 7. `react-hooks/exhaustive-deps`

**Error**: Missing dependency in useEffect

```typescript
// ❌ Bad
useEffect(() => {
  fetchUser(userId);
}, []); // userId missing!

// ✅ Good
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Or use useCallback if userId changes
const fetchUserCallback = useCallback(() => {
  fetchUser(userId);
}, [userId]);

useEffect(() => {
  fetchUserCallback();
}, [fetchUserCallback]);
```

### 8. `react-refresh/only-export-components`

**Error**: Fast Refresh only works with components

```typescript
// ❌ Bad (multiple exports)
export const CONFIG = { ... }
export function MyComponent() { ... }

// ✅ Good (separate files)
// config.ts
export const CONFIG = { ... }

// MyComponent.tsx
export function MyComponent() { ... }

// Or mark constant export
export const CONFIG = { ... }  // eslint-disable-line react-refresh/only-export-components
```

### 9. `@typescript-eslint/no-unused-vars`

**Error**: Variable declared but not used

```typescript
// ❌ Bad
const [data, setData] = useState()

// ✅ Good (use underscore prefix)
const [_data, setData] = useState()

// Or actually use it
const [data, setData] = useState()
return <div>{data}</div>
```

### 10. `no-console`

**Error**: Unexpected console statement

```typescript
// ❌ Bad
console.log('Debug info');

// ✅ Good (warnings/errors allowed)
console.warn('Warning message');
console.error('Error message');

// Or disable for debug session
// eslint-disable-next-line no-console
console.log('Debug info');
```

---

## Disabling Rules

### Disable for One Line

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

### Disable for Entire File

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

// File code here...
```

### Disable Multiple Rules

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any, no-console */

// File code here...

/* eslint-enable @typescript-eslint/no-explicit-any, no-console */
```

### Disable for Block

```typescript
/* eslint-disable @typescript-eslint/no-floating-promises */
fetchData1();
fetchData2();
fetchData3();
/* eslint-enable @typescript-eslint/no-floating-promises */
```

---

## VS Code Integration

### Check ESLint Status

1. Open any `.tsx` file
2. Look at bottom-right status bar
3. Should see "ESLint" with checkmark ✓

### Manual Trigger

- **Command Palette** → "ESLint: Fix all auto-fixable problems"
- **Keyboard**: `Ctrl+Shift+P` → Type "eslint fix"

### Restart ESLint Server

If ESLint stops working:

1. Command Palette → "ESLint: Restart ESLint Server"
2. Or reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## Configuration Files

| File                    | Purpose                              |
| ----------------------- | ------------------------------------ |
| `eslint.config.js`      | Main ESLint configuration            |
| `tsconfig.json`         | TypeScript project references        |
| `tsconfig.app.json`     | App source + tests TypeScript config |
| `tsconfig.node.json`    | Build tools TypeScript config        |
| `.vscode/settings.json` | VS Code ESLint integration           |

---

## File Type → Config Mapping

| File                   | ESLint Config  | tsconfig Used        |
| ---------------------- | -------------- | -------------------- |
| `src/App.tsx`          | `app-source`   | `tsconfig.app.json`  |
| `src/hooks/useAuth.ts` | `app-source`   | `tsconfig.app.json`  |
| `src/App.test.tsx`     | `test-files`   | `tsconfig.app.json`  |
| `vite.config.ts`       | `config-files` | `tsconfig.node.json` |
| `vitest.config.ts`     | `config-files` | `tsconfig.node.json` |

---

## Troubleshooting

### ESLint Not Running

```bash
# Check if ESLint is installed
npx eslint --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript cache
rm -rf node_modules/.tmp/
```

### "Project service failed to load"

```bash
# Type-check first (builds TypeScript cache)
npm run type-check

# Then lint
npm run lint
```

### "Cannot find module 'eslint-plugin-X'"

```bash
# Install missing plugin
npm install -D eslint-plugin-X

# Or remove from eslint.config.js if not needed
```

### Inconsistent Results (VS Code vs CLI)

```bash
# Ensure VS Code uses workspace TypeScript
# Command Palette → "TypeScript: Select TypeScript Version" → "Use Workspace Version"

# Restart ESLint server
# Command Palette → "ESLint: Restart ESLint Server"
```

---

## Performance Tips

### Lint Only Changed Files (Git)

```bash
# Lint staged files
npx eslint $(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

# Lint files changed from main
npx eslint $(git diff main --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')
```

### Lint Specific Directory

```bash
npx eslint src/components/
npx eslint src/hooks/
```

### CI Optimization

```yaml
# Only lint changed files in PR
- name: Get changed files
  id: changed-files
  uses: tj-actions/changed-files@v39
  with:
    files: |
      **/*.ts
      **/*.tsx

- name: Lint changed files
  if: steps.changed-files.outputs.any_changed == 'true'
  run: npx eslint ${{ steps.changed-files.outputs.all_changed_files }}
```

---

## Type-Aware Rules (Require Type Info)

These rules need TypeScript type information:

- `@typescript-eslint/no-floating-promises`
- `@typescript-eslint/no-misused-promises`
- `@typescript-eslint/await-thenable`
- `@typescript-eslint/no-unnecessary-condition`
- `@typescript-eslint/prefer-nullish-coalescing`
- `@typescript-eslint/no-unsafe-*` rules

**Performance**: Slightly slower but catch more bugs. Worth it! 🚀

---

## Rule Severity Levels

| Level          | Meaning                   | Exit Code |
| -------------- | ------------------------- | --------- |
| `off` or `0`   | Disabled                  | 0         |
| `warn` or `1`  | Warning (doesn't fail CI) | 0         |
| `error` or `2` | Error (fails CI)          | 1         |

---

## Advanced: Custom Rules Per File

If you need different rules for specific files:

```javascript
// In eslint.config.js
export default tseslint.config(
  // ... existing configs ...

  // Custom override for specific file
  {
    files: ['src/legacy/OldComponent.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Relax for legacy code
    },
  },
);
```

---

## Resources

- [Full Documentation](./ESLINT_CONFIGURATION.md)
- [Migration Guide](./ESLINT_MIGRATION_GUIDE.md)
- [TypeScript ESLint Docs](https://typescript-eslint.io/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)

---

**Quick help**: Open any `.tsx` file and hover over a squiggly line to see the rule name and fix suggestions!
