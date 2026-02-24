# 🚀 API Loading System - Quick Reference

## 🎯 Decision Tree

```
Need a loader? START HERE:
│
├─ Is it authentication/critical?
│  └─ ✅ Use: Global Loader
│      import { useGlobalLoader } from '@/hooks/useLoader';
│
├─ Is it data fetching?
│  ├─ Initial load of list/cards?
│  │  └─ ✅ Use: Skeleton Loader
│  │      import { SkeletonCard, SkeletonText } from '@/components';
│  │
│  └─ Refreshing section/card?
│     └─ ✅ Use: Section Loader
│         import { SectionLoader } from '@/components';
│
├─ Is it a user action (button click)?
│  └─ ✅ Use: Button Loading State
│      <Button isLoading={isPending}>Submit</Button>
│
├─ Is it < 200ms or background operation?
│  └─ ⛔ Don't use loader
│
└─ Small inline indicator needed?
   └─ ✅ Use: Inline Spinner
       import { InlineSpinner } from '@/components';
```

---

## 📦 Import Cheatsheet

```tsx
// Components
import {
  GlobalLoader, // Full-page overlay
  SkeletonLoader, // Content placeholder
  SkeletonCard, // Pre-built card skeleton
  SkeletonText, // Text lines
  SkeletonAvatar, // Circle avatar
  SkeletonImage, // Image placeholder
  SectionLoader, // Section overlay
  InlineSpinner, // Small spinner
  Button, // Has built-in loading
} from '@/components';

// Hooks
import {
  useGlobalLoader, // Global page loader
  useScopedLoader, // Component-specific loader
  useApiLoader, // Namespace-based tracking
  useAsyncLoader, // Async wrapper with debounce
} from '@/hooks/useLoader';

// React Query (already imported in your queries)
import { useQuery, useMutation } from '@tanstack/react-query';
```

---

## 💡 Common Patterns

### Pattern 1: List with Skeleton (Most Common)

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['items'],
  queryFn: fetchItems,
});

if (isLoading) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

return (
  <div className='grid grid-cols-3 gap-4'>
    {data.map((item) => (
      <ItemCard key={item.id} {...item} />
    ))}
  </div>
);
```

---

### Pattern 2: Form with Button Loading

```tsx
const { mutate, isPending } = useMutation({
  mutationFn: submitForm,
  onSuccess: () => showToast.success('Saved!'),
});

return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      mutate(data);
    }}
  >
    <Input name='name' />
    <Button type='submit' isLoading={isPending}>
      Submit
    </Button>
  </form>
);
```

---

### Pattern 3: Section with Refresh

```tsx
const { data, isLoading, refetch, isRefetching } = useQuery({
  queryKey: ['section'],
  queryFn: fetchData,
});

return (
  <div className='card'>
    <button onClick={() => refetch()}>Refresh</button>

    <SectionLoader isLoading={isRefetching} overlay={true}>
      {isLoading ? <SkeletonText lines={3} /> : <Content data={data} />}
    </SectionLoader>
  </div>
);
```

---

### Pattern 4: Global Loader for Auth

```tsx
// In your mutation hook (src/hooks/queries/useAuth.ts)
import { useAppDispatch } from '../redux';
import { showGlobalLoader, hideGlobalLoader } from '@/store/loaderSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials) => {
      dispatch(showGlobalLoader('Logging in...'));
      try {
        return await authApi.login(credentials);
      } finally {
        setTimeout(() => dispatch(hideGlobalLoader()), 300);
      }
    },
  });
};
```

---

### Pattern 5: Search with Debounce

```tsx
const { execute, isLoading } = useAsyncLoader({
  debounceTime: 500,
  minDisplayTime: 0,
});

const handleSearch = (query: string) => {
  execute(async () => {
    const results = await api.search(query);
    setResults(results);
  });
};

return (
  <div className='relative'>
    <input onChange={(e) => handleSearch(e.target.value)} />
    {isLoading && (
      <div className='absolute right-3 top-3'>
        <InlineSpinner size='sm' />
      </div>
    )}
  </div>
);
```

---

## 🎨 Visual Guide

### Skeleton Variants

```tsx
// Text lines
<SkeletonText lines={3} />

// Avatar/icon
<SkeletonAvatar size="48px" />

// Image
<SkeletonImage width="100%" height="200px" />

// Full card (header + content + footer)
<SkeletonCard />

// Custom
<SkeletonLoader
  variant="rectangle"
  width="200px"
  height="100px"
  speed="fast"
/>
```

### Section Loader Modes

```tsx
// Overlay mode - dims content, shows loader on top
<SectionLoader isLoading={true} overlay={true}>
  <Content />
</SectionLoader>

// Replace mode - replaces content with loader
<SectionLoader
  isLoading={true}
  overlay={false}
  message="Loading..."
  minHeight="300px"
>
  <Content />
</SectionLoader>
```

### Spinner Sizes & Colors

```tsx
<InlineSpinner size="xs" />   // 12px
<InlineSpinner size="sm" />   // 16px
<InlineSpinner size="md" />   // 20px (default)
<InlineSpinner size="lg" />   // 24px

<InlineSpinner variant="primary" />    // Primary color
<InlineSpinner variant="secondary" />  // Gray
<InlineSpinner variant="white" />      // White
<InlineSpinner variant="current" />    // Inherit color
```

---

## ⚡ Performance Tips

### ✅ DO

```tsx
// Minimum display time to prevent flicker
const { isLoading, startLoading, stopLoading } = useScopedLoader('key', {
  minDisplayTime: 300,
});

// Debounce fast operations
const { execute } = useAsyncLoader({
  debounceTime: 200,
});

// Use skeleton for better perceived performance
if (isLoading) return <SkeletonCard />;
```

### ❌ DON'T

```tsx
// Don't use global loader for everything
// ❌ BAD
const { show, hide } = useGlobalLoader();
const fetchData = async () => {
  show(); // Blocks entire UI unnecessarily
  await api.getData();
  hide();
};

// ✅ GOOD - Use React Query
const { data, isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: api.getData,
});

// Don't show loaders for fast operations
// ❌ BAD
if (isLoading) return <Spinner />; // Might flash

// ✅ GOOD - Debounce
const { execute, isLoading } = useAsyncLoader({
  debounceTime: 200, // Only show if > 200ms
});
```

---

## 🐛 Troubleshooting

### Loader Stuck Visible

```tsx
// ❌ BAD - No cleanup on error
const handleSubmit = async () => {
  startLoading();
  await api.submit(); // If this fails, loader stays
  stopLoading();
};

// ✅ GOOD - Use try/finally
const handleSubmit = async () => {
  startLoading();
  try {
    await api.submit();
  } finally {
    stopLoading(); // Always runs
  }
};
```

### Loader Flickers

```tsx
// ❌ BAD - No minimum display time
const { isLoading } = useScopedLoader('key');

// ✅ GOOD - Minimum 300ms
const { isLoading } = useScopedLoader('key', {
  minDisplayTime: 300,
});
```

### Multiple Loaders Conflict

```tsx
// ❌ BAD - Global loader for concurrent requests
const loadDashboard = async () => {
  show(); // Blocks UI
  await Promise.all([fetchStats(), fetchCharts(), fetchActivity()]);
  hide();
};

// ✅ GOOD - Individual loaders
const StatsCard = () => {
  const { data, isLoading } = useQuery(['stats'], fetchStats);
  return isLoading ? <SkeletonCard /> : <Stats data={data} />;
};

const ChartsCard = () => {
  const { data, isLoading } = useQuery(['charts'], fetchCharts);
  return isLoading ? <SkeletonCard /> : <Charts data={data} />;
};
```

---

## 📱 Responsive Considerations

```tsx
// Mobile-friendly skeleton
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {isLoading ? (
    Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))
  ) : (
    data.map(item => <Card key={item.id} {...item} />)
  )}
</div>

// Smaller spinners on mobile
<InlineSpinner
  size={isMobile ? 'sm' : 'md'}
  className="ml-2"
/>
```

---

## 🎯 When to Use What

| Component        | Use Case            | Example                    |
| ---------------- | ------------------- | -------------------------- |
| `GlobalLoader`   | Critical operations | Login, logout, app init    |
| `SkeletonCard`   | List initial load   | Product grid, user list    |
| `SkeletonText`   | Text content        | Article, description       |
| `SkeletonAvatar` | Profile images      | User avatar, team members  |
| `SkeletonImage`  | Images              | Hero images, galleries     |
| `SectionLoader`  | Section refresh     | Dashboard card, widget     |
| `InlineSpinner`  | Small indicators    | Delete icon, inline action |
| `Button loading` | Form actions        | Submit, save, delete       |

---

## 🔗 Quick Links

- **Full Guide:** `API_LOADER_GUIDE.md`
- **Checklist:** `LOADER_IMPLEMENTATION_CHECKLIST.md`
- **Components:** `src/components/Loader/`
- **Hooks:** `src/hooks/useLoader.ts`
- **Store:** `src/store/loaderSlice.ts`

---

## 📞 Need Help?

### Check the Full Guide First

Most questions are answered in `API_LOADER_GUIDE.md`

### Common Questions

**Q: Which loader should I use?**  
A: Follow the decision tree at the top of this doc

**Q: Loader is flickering**  
A: Use minimum display time (300ms)

**Q: Loader stuck visible**  
A: Always use try/finally for cleanup

**Q: Multiple loaders conflict**  
A: Use scoped loaders instead of global

**Q: Performance issues**  
A: Use skeleton loaders, debounce fast ops

---

**Last Updated:** 2026-01-24
**Print this page and keep it handy! 📌**
