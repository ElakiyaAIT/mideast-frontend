# 🎯 API Loading System - Implementation Checklist

## ✅ Setup Complete

The following components and systems have been implemented:

### 📦 Components Created

- [x] `GlobalLoader` - Full-page overlay loader
- [x] `SkeletonLoader` - Content placeholders with variants
- [x] `SectionLoader` - Section/card loaders
- [x] `InlineSpinner` - Small inline spinners
- [x] `Button` - Already has loading state support

### 🎣 Hooks Created

- [x] `useGlobalLoader` - Manage global loader state
- [x] `useScopedLoader` - Component-specific loaders with cleanup
- [x] `useApiLoader` - Namespace-based request tracking
- [x] `useAsyncLoader` - Async operation wrapper with debouncing

### 🏗️ Infrastructure

- [x] Enhanced `loaderSlice` with concurrent request tracking
- [x] Animations added to CSS
- [x] Tailwind config updated with shimmer animations
- [x] GlobalLoader integrated into App.tsx
- [x] TypeScript types defined

### 📚 Documentation

- [x] Comprehensive API Loader Guide
- [x] Examples for all use cases
- [x] Best practices documented
- [x] Decision trees and flowcharts

---

## 🚀 Next Steps - Integration

### 1. Optional: Enable Automatic Axios Interceptor

**Location:** `src/main.tsx`

```tsx
// Add after imports
import { setupApiLoaderInterceptor } from './utils/apiLoaderInterceptor';
import axiosInstance from './api/axiosInstance';
import { store } from './store';

// Setup interceptor (optional - provides automatic loading for all API calls)
setupApiLoaderInterceptor(axiosInstance, store.dispatch);
```

**Note:** This is optional. You can manually control loaders using hooks instead.

---

### 2. Update Existing Pages

Here's a priority list of pages to update with loading states:

#### High Priority (User-Facing Critical Paths)

##### ✅ Auth Pages

- [ ] `src/pages/auth/LoginPage.tsx`
  - Already uses `useLogin` with `isPending`
  - Button loading state: ✅ Working
  - Optional: Add global loader in mutation

- [ ] `src/pages/auth/RegisterPage.tsx`
  - Already uses `useRegister` with `isPending`
  - Button loading state: ✅ Working

- [ ] `src/pages/auth/ForgotPasswordPage.tsx`
  - Already uses `useForgotPassword` with `isPending`
  - Button loading state: ✅ Working

##### 📊 Dashboard

- [ ] Check if dashboard page exists
- [ ] Add skeleton loaders for initial data load
- [ ] Add section loaders for card refreshes
- [ ] Implement concurrent request handling

##### 🏠 Home Page

- [ ] `src/pages/public/HomePage.tsx`
  - Check for API calls
  - Add skeleton loaders for product cards
  - Add skeleton loaders for auction items

#### Medium Priority

##### 📄 Public Pages

- [ ] `src/pages/public/BuyPage.tsx`
- [ ] `src/pages/public/SellPage.tsx`
- [ ] `src/pages/public/BuyNowDetailsPage.tsx`
- [ ] `src/pages/public/AboutUsPage.tsx`
- [ ] `src/pages/public/ContactUsPage.tsx`

---

### 3. Test Current Implementation

#### Manual Testing

Run the application and verify:

```bash
npm run dev
```

##### Test Cases:

**✅ Global Loader**

1. Should appear only when explicitly called
2. Should block all UI interaction
3. Should show custom message if provided
4. Should have smooth fade in/out

**✅ Skeleton Loaders**

1. Should animate smoothly (shimmer effect)
2. Should match content dimensions
3. Should support multiple variants
4. Should be visible in dark mode

**✅ Section Loader**

1. Should show overlay when `overlay={true}`
2. Should replace content when `overlay={false}`
3. Should respect minimum display time
4. Should auto-cleanup on unmount

**✅ Button Loading**

1. Should disable button during loading
2. Should show spinner and "Loading..." text
3. Should maintain button dimensions
4. Should work with all button variants

**✅ Inline Spinner**

1. Should render at correct size
2. Should animate smoothly
3. Should match color variant
4. Should be accessible

#### Network Throttling Test

**Chrome DevTools:**

1. Open DevTools (F12)
2. Go to Network tab
3. Set throttling to "Slow 3G"
4. Test each page and verify loaders appear/disappear correctly

**Expected Behavior:**

- Loaders should appear after ~200ms
- Loaders should stay visible for at least 300ms
- No flicker or jarring transitions
- Clear visual feedback for all operations

---

### 4. Integration Examples

#### Example 1: Update HomePage with Skeletons

**Before:**

```tsx
const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

**After:**

```tsx
import { SkeletonCard } from '@/components';

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      {data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

---

#### Example 2: Add Global Loader to Login

**Update:** `src/hooks/queries/useAuth.ts`

```tsx
import { useAppDispatch } from '../redux';
import { showGlobalLoader, hideGlobalLoader } from '@/store/loaderSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequestDto): Promise<UserDto> => {
      // Show global loader for auth
      dispatch(showGlobalLoader('Logging in...'));

      try {
        const response = await authApi.login(credentials);
        if (!response.success) {
          throw new Error(response.message ?? 'Login failed');
        }
        return response.data.user;
      } finally {
        // Hide after minimum display time
        setTimeout(() => {
          dispatch(hideGlobalLoader());
        }, 300);
      }
    },
    onSuccess: (user): void => {
      queryClient.setQueryData(authKeys.profile(), user);
      showToast.success('Login successful');
      void navigate('/');
    },
    onError: (error): void => {
      dispatch(hideGlobalLoader()); // Ensure cleanup on error
      const normalizedError = normalizeApiError(error);
      showToast.error(normalizedError.message);
    },
  });
};
```

---

#### Example 3: Add Section Loader to Dashboard Card

```tsx
import { SectionLoader } from '@/components';
import { useDashboard } from '@/hooks/queries/useDashboard';

const DashboardStatsCard = () => {
  const { data, isLoading, refetch, isRefetching } = useDashboard();

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>Statistics</h3>
        <button onClick={() => refetch()}>Refresh</button>
      </div>

      <SectionLoader isLoading={isRefetching} overlay={true} message='Refreshing...'>
        <div className='stats-grid'>
          {isLoading ? (
            <SkeletonText lines={3} />
          ) : (
            <>
              <Stat label='Users' value={data.users} />
              <Stat label='Revenue' value={data.revenue} />
              <Stat label='Orders' value={data.orders} />
            </>
          )}
        </div>
      </SectionLoader>
    </div>
  );
};
```

---

### 5. Accessibility Verification

Run these checks:

#### ✅ Keyboard Navigation

- [ ] Can tab through UI while loaders are showing
- [ ] Focus is trapped when global loader is active
- [ ] Buttons are properly disabled during loading

#### ✅ Screen Reader

- [ ] Loaders have proper ARIA labels
- [ ] Loading states are announced (`aria-live="polite"`)
- [ ] Role attributes are correct (`role="progressbar"`)

#### ✅ Visual

- [ ] Sufficient color contrast in both light and dark modes
- [ ] Animations can be disabled via `prefers-reduced-motion`
- [ ] Text is readable at all sizes

---

### 6. Performance Verification

#### Bundle Size Impact

```bash
npm run build
```

Check that:

- [ ] Bundle size increase is minimal (< 10KB)
- [ ] Tree-shaking is working
- [ ] No duplicate code

#### Runtime Performance

- [ ] No memory leaks (check DevTools Memory tab)
- [ ] Smooth 60fps animations
- [ ] No layout shifts
- [ ] Fast initial render

---

### 7. Error Handling

Verify error scenarios:

#### ✅ API Errors

- [ ] Loader hides when request fails
- [ ] Error message is displayed
- [ ] User can retry operation
- [ ] Global loader doesn't get stuck

#### ✅ Network Errors

- [ ] Loader hides on timeout
- [ ] Offline state is handled
- [ ] Reconnection is handled gracefully

#### ✅ Component Errors

- [ ] Loader cleanup on unmount
- [ ] No console errors
- [ ] ErrorBoundary catches loader issues

---

### 8. Edge Cases

Test these scenarios:

#### ✅ Concurrent Requests

- [ ] Multiple API calls don't conflict
- [ ] Namespace tracking works correctly
- [ ] Request counting is accurate

#### ✅ Fast Operations

- [ ] < 200ms operations don't show loader (with debouncing)
- [ ] Minimum display time prevents flicker
- [ ] No visual glitches

#### ✅ Slow Networks

- [ ] Loaders appear within 300ms
- [ ] UI remains responsive
- [ ] Cancel requests works correctly

#### ✅ Race Conditions

- [ ] Rapid clicking doesn't break loaders
- [ ] Component unmount cleans up properly
- [ ] No memory leaks from abandoned requests

---

### 9. Mobile Testing

Test on various devices:

#### ✅ Responsive Design

- [ ] Loaders scale correctly
- [ ] Touch interactions work
- [ ] Animations are smooth
- [ ] No layout issues

#### ✅ Performance

- [ ] No lag on low-end devices
- [ ] Animations are GPU-accelerated
- [ ] Battery usage is acceptable

---

### 10. Documentation Updates

#### For Your Team

- [ ] Share API_LOADER_GUIDE.md with developers
- [ ] Add examples to your project wiki
- [ ] Update component documentation
- [ ] Create onboarding guide

#### Code Comments

- [ ] All components have JSDoc comments
- [ ] Complex logic is explained
- [ ] Examples are provided in code

---

## 🎓 Training & Adoption

### Developer Onboarding

**Quick Start for New Developers:**

1. **Read the guide:** `API_LOADER_GUIDE.md`
2. **Review examples:** See implementation examples in guide
3. **Follow patterns:** Use existing implementations as templates
4. **Ask questions:** Refer to decision trees in guide

### Common Patterns

Provide these snippets to your team:

#### Pattern 1: Data Fetching with React Query

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFn,
});

if (isLoading) return <SkeletonCard />;
return <Content data={data} />;
```

#### Pattern 2: Form Submission

```tsx
const { mutate, isPending } = useMutation({ ... });

<Button onClick={() => mutate(data)} isLoading={isPending}>
  Submit
</Button>
```

#### Pattern 3: Section Refresh

```tsx
const { refetch, isRefetching } = useQuery({ ... });

<SectionLoader isLoading={isRefetching} overlay={true}>
  <Content />
</SectionLoader>
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Loader stuck visible

**Solution:**

- Check that `endRequest` or `stopLoading` is called in `finally` block
- Verify no errors prevent cleanup
- Use Redux DevTools to inspect loader state

#### Issue: Loader flickers

**Solution:**

- Implement minimum display time (300ms)
- Use debouncing for fast operations
- Check if loader is hiding too quickly

#### Issue: Multiple loaders showing

**Solution:**

- Use scoped loaders instead of global
- Implement namespace-based tracking
- Review concurrent request handling

#### Issue: Performance issues

**Solution:**

- Reduce animation complexity
- Optimize skeleton layouts
- Check for memory leaks
- Use React DevTools Profiler

---

## 📊 Metrics & Monitoring

### Track These Metrics

#### UX Metrics

- [ ] Average time to first loader
- [ ] Loader display duration
- [ ] User interactions during loading
- [ ] Error rate during loading

#### Performance Metrics

- [ ] Component render time
- [ ] Animation frame rate
- [ ] Memory usage
- [ ] Bundle size impact

#### Business Metrics

- [ ] Conversion rate impact
- [ ] User satisfaction (surveys)
- [ ] Support ticket reduction
- [ ] Task completion time

---

## 🎉 Completion Criteria

### ✅ System is Production-Ready When:

- [ ] All components are implemented
- [ ] All hooks are working correctly
- [ ] Documentation is complete
- [ ] Examples are provided
- [ ] Tests pass on all devices
- [ ] Performance is acceptable
- [ ] Accessibility requirements met
- [ ] Error handling is robust
- [ ] Team is trained
- [ ] Monitoring is in place

---

## 📞 Support

### Resources

- **Guide:** `API_LOADER_GUIDE.md`
- **Checklist:** This document
- **Examples:** See guide for implementation examples
- **Components:** `src/components/Loader/`
- **Hooks:** `src/hooks/useLoader.ts`
- **Store:** `src/store/loaderSlice.ts`

### Need Help?

Refer to the comprehensive guide (`API_LOADER_GUIDE.md`) which includes:

- Complete implementation examples
- Decision trees
- Best practices
- Performance optimization
- Common patterns

---

**Last Updated:** 2026-01-24
**Status:** ✅ Ready for Integration
