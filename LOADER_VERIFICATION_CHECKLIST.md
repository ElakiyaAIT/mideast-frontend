# ✅ API Loader Verification Checklist

Use this checklist to systematically verify that loaders are implemented correctly across your entire application.

---

## 🎯 Quick Start

### Before You Begin

1. [ ] Read `API_LOADER_IMPLEMENTATION_PLAN.md`
2. [ ] Review `LOADER_CODE_EXAMPLES.md`
3. [ ] Have `LOADER_QUICK_REFERENCE.md` open for reference
4. [ ] Open browser DevTools (Network tab)
5. [ ] Enable Redux DevTools (to see loader state)

---

## 📋 Phase 1: Foundation Setup

### 1.1 API Interceptor Setup

**File to Check:** `src/main.tsx`

- [ ] Import `setupApiLoaderInterceptor` is present
- [ ] Import `axiosInstance` is present
- [ ] Import `store` is present
- [ ] `setupApiLoaderInterceptor(axiosInstance, store.dispatch)` is called BEFORE rendering
- [ ] No errors in console on app startup

**How to Verify:**

1. Open app in browser
2. Open Redux DevTools
3. Check that `loader` state exists in Redux store
4. Make any API call (e.g., login)
5. Watch Redux DevTools for `startRequest` and `endRequest` actions

**Expected Result:**

```
Actions:
1. startRequest { id: "...", namespace: "auth", type: "global", ... }
2. endRequest "request-id"
```

**Status:** [ ] ✅ Verified | [ ] ❌ Issues | [ ] ⏳ Pending

**Notes:**

```
[Write any issues or observations here]
```

---

### 1.2 GlobalLoader Component

**File to Check:** `src/app/App.tsx`

- [ ] `<GlobalLoader />` is imported
- [ ] `<GlobalLoader />` is rendered in `AppContent` component
- [ ] Appears BEFORE `<AppRoutes />`

**How to Verify:**

1. Inspect DOM - should see `GlobalLoader` component (even if not visible)
2. Open Redux DevTools
3. Dispatch `showGlobalLoader()` action manually
4. Verify full-page overlay appears

**Expected Result:**

- Full-page loader overlay appears
- Blocks all interaction
- Shows spinner animation
- Optional message displays

**Status:** [ ] ✅ Verified | [ ] ❌ Issues | [ ] ⏳ Pending

**Notes:**

```
[Write any issues or observations here]
```

---

## 📋 Phase 2: API Configuration

### 2.1 Auth API Configuration

**File to Check:** `src/api/authApi.ts`

For EACH endpoint, verify the loader configuration:

#### Login

- [ ] Uses `enableGlobalLoader('Logging in...')`
- [ ] Message is user-friendly
- [ ] Test: Login form shows global loader

**Test Steps:**

1. Navigate to `/login`
2. Enter credentials
3. Click submit
4. **Expected:** Global loader appears with "Logging in..." message
5. **Expected:** Loader disappears after API completes

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Register

- [ ] Uses `enableGlobalLoader('Creating your account...')`
- [ ] Test: Register form shows global loader

**Test Steps:**

1. Navigate to `/register`
2. Fill form
3. Click submit
4. **Expected:** Global loader appears with message
5. **Expected:** Redirects to home after success

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Logout

- [ ] Uses `disableLoader()`
- [ ] Test: No loader appears during logout

**Test Steps:**

1. Login to app
2. Click logout
3. **Expected:** NO global loader appears
4. **Expected:** Immediate redirect to login page

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Refresh Token

- [ ] Uses `disableLoader()`
- [ ] Test: Silent refresh (no loader)

**Test Steps:**

1. Login to app
2. Wait for token expiration (or force 401 error)
3. **Expected:** Token refreshes silently in background
4. **Expected:** NO loader visible to user
5. Check Network tab: Should see `/auth/refresh` call

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Get Current User

- [ ] Uses default scoped loader (no explicit config)
- [ ] Test: Shows loader but doesn't block UI

**Test Steps:**

1. Hard refresh app (Ctrl+Shift+R)
2. **Expected:** Doesn't show global blocking loader
3. **Expected:** Page content may show loading states
4. Check Redux DevTools: Should see scoped request, NOT global

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Forgot Password

- [ ] Uses `enableGlobalLoader('Sending reset link...')`
- [ ] Test: Shows global loader

**Test Steps:**

1. Navigate to `/forgot-password`
2. Enter email
3. Click submit
4. **Expected:** Global loader appears with message
5. **Expected:** Success toast after completion

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### Reset Password

- [ ] Uses `enableGlobalLoader('Resetting password...')`
- [ ] Test: Shows global loader

**Test Steps:**

1. Navigate to `/reset-password?token=xxx`
2. Enter new password
3. Click submit
4. **Expected:** Global loader appears with message
5. **Expected:** Redirects to login after success

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 2.2 Equipment API Configuration

**File to Check:** `src/api/equipmentApi.ts`

- [ ] File exists
- [ ] `getEquipment` uses default scoped loader
- [ ] `getEquipmentById` uses default scoped loader
- [ ] `getFeaturedEquipment` uses default scoped loader
- [ ] `searchEquipment` uses default scoped loader

**Test Steps:**

1. Open Network tab
2. Navigate to `/buy`
3. **Expected:** See `/equipment` API call
4. **Expected:** Loader shows ONLY in equipment section (not full page)
5. Check Redux: Request should be scoped, not global

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 2.3 User API Configuration

**File to Check:** `src/api/userApi.ts`

- [ ] `getProfile` - default scoped loader
- [ ] `updateProfile` - consider global loader for important update

**Recommended Update:**

```typescript
updateProfile: async (data: UpdateUserProfileDto): Promise<ApiResponse<UpdateUserProfileResponseDto>> => {
  const response = await axiosInstance.patch<ApiResponse<UpdateUserProfileResponseDto>>(
    '/auth/profile',
    data,
    enableGlobalLoader('Updating profile...'), // Add this
  );
  return response.data;
},
```

**Status:** [ ] ✅ Updated | [ ] ⏳ Pending

---

## 📋 Phase 3: Page Implementations

### 3.1 Auth Pages

#### LoginPage

**File:** `src/pages/auth/LoginPage.tsx`

- [ ] Login button has `isLoading={loginMutation.isPending}`
- [ ] Login button is disabled during loading
- [ ] Google Sign In button has `disabled={googleSignInMutation.isPending || loginMutation.isPending}`
- [ ] Shows "Loading..." text during Google sign in

**Test Steps:**

1. Navigate to `/login`
2. Click "Log in with Google" button
3. **Expected:** Button shows loading spinner
4. **Expected:** Button is disabled
5. Enter email/password
6. Click "Sign In"
7. **Expected:** Button shows loading spinner
8. **Expected:** Global loader appears (from API config)

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

**Screenshot:** [ ] Attached

---

#### RegisterPage

**File:** `src/pages/auth/RegisterPage.tsx`

- [ ] Submit button has `isLoading={registerMutation.isPending}`
- [ ] Submit button is disabled during loading
- [ ] Google Sign In button has loading state

**Test Steps:**

1. Navigate to `/register`
2. Fill form
3. Click submit
4. **Expected:** Button shows loading spinner
5. **Expected:** Global loader appears

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### ForgotPasswordPage

**File:** `src/pages/auth/ForgotPasswordPage.tsx`

- [ ] Submit button has `isLoading={forgotPasswordMutation.isPending}`
- [ ] Form disabled during submission

**Test Steps:**

1. Navigate to `/forgot-password`
2. Enter email
3. Click submit
4. **Expected:** Button shows loading spinner
5. **Expected:** Global loader appears
6. **Expected:** Success toast after completion

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

#### ResetPasswordPage

**File:** `src/pages/auth/ResetPasswordPage.tsx`

- [ ] Submit button has `isLoading={resetPasswordMutation.isPending}`
- [ ] Form disabled during submission

**Test Steps:**

1. Navigate to `/reset-password?token=test`
2. Enter new password
3. Click submit
4. **Expected:** Button shows loading spinner
5. **Expected:** Global loader appears
6. **Expected:** Redirects to login on success

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 3.2 Public Pages - Data-Driven

#### HomePage

**File:** `src/pages/public/HomePage.tsx`

**Featured Equipment Section:**

- [ ] Imports `useFeaturedEquipment` hook
- [ ] Imports `SkeletonCard` component
- [ ] Shows 3 skeleton cards during loading (`isFeaturedLoading === true`)
- [ ] Shows actual equipment cards after loading
- [ ] Handles empty state (no featured equipment)

**Test Steps:**

1. Hard refresh homepage (Ctrl+Shift+R)
2. **Expected:** See 3 skeleton cards in "Latest Equipment" section
3. **Expected:** Skeleton cards animate with shimmer effect
4. **Expected:** After ~1-2s, actual equipment cards appear
5. Throttle network to "Slow 3G"
6. Refresh again
7. **Expected:** Skeleton loaders persist longer
8. **Expected:** No content shift when real cards load

**Visual Checklist:**

- [ ] Skeleton cards match size/shape of real cards
- [ ] No layout shift when loading completes
- [ ] Smooth transition from skeleton to content
- [ ] Loading indicators are centered and visible

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

**Screenshot:** [ ] Attached

---

#### BuyPage (Equipment List)

**File:** `src/pages/public/BuyPage.tsx`

**Required Implementations:**

- [ ] Imports `useEquipmentList` hook
- [ ] Imports `SkeletonCard` component
- [ ] Shows 6 skeleton cards during initial load
- [ ] Shows equipment grid after loading
- [ ] Handles error state with retry button
- [ ] Handles empty state (no equipment found)
- [ ] Result count updates dynamically
- [ ] Pagination disabled during loading
- [ ] Filters trigger new query

**Test Steps - Initial Load:**

1. Navigate to `/buy`
2. **Expected:** See 6 skeleton cards in grid
3. **Expected:** Result count shows "Loading..."
4. **Expected:** Pagination hidden during loading
5. **Expected:** After load, see actual equipment
6. **Expected:** Result count shows "Showing X-Y of Z Results"

**Test Steps - Filtering:**

1. On Buy page, check a filter (e.g., category)
2. Click "Apply Filters"
3. **Expected:** Grid shows skeleton cards again
4. **Expected:** Result count updates
5. **Expected:** New results load

**Test Steps - Pagination:**

1. Click page "2" in pagination
2. **Expected:** Skeleton cards appear
3. **Expected:** Pagination buttons disabled
4. **Expected:** Page 2 results load

**Test Steps - Error Handling:**

1. Disconnect network OR use DevTools to block `/equipment` endpoint
2. Navigate to `/buy`
3. **Expected:** Error state appears after loading
4. **Expected:** "Failed to Load Equipment" message
5. **Expected:** "Try Again" button visible
6. Click "Try Again"
7. **Expected:** Attempts to reload

**Test Steps - Empty State:**

1. Apply filters that return no results
2. **Expected:** "No Equipment Found" message
3. **Expected:** "Try adjusting your filters" help text
4. **Expected:** No skeleton loaders visible

**Visual Checklist:**

- [ ] Grid layout remains consistent (no shifting)
- [ ] Skeleton cards look like real cards
- [ ] Smooth transitions
- [ ] Error state is clear and actionable
- [ ] Empty state is helpful

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

**Screenshot:** [ ] Attached

---

#### BuyNowDetailsPage (Equipment Detail)

**File:** `src/pages/public/BuyNowDetailsPage.tsx`

**Required Implementations:**

- [ ] Imports `useEquipmentDetail` hook
- [ ] Uses `id` from URL params
- [ ] Shows skeleton loader during initial load
- [ ] Shows equipment details after loading
- [ ] Handles error state (equipment not found)

**Recommended Implementation:**

```typescript
import { useParams } from 'react-router-dom';
import { useEquipmentDetail } from '../../hooks/queries/useEquipment';
import { SkeletonLoader, SkeletonText, SkeletonImage } from '../../components';

const BuyNowDetailsPage = () => {
  const { id } = useParams();
  const { data: equipment, isLoading, isError } = useEquipmentDetail(id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonImage height="500px" />
          <div className="space-y-6">
            <SkeletonText lines={1} height="40px" />
            <SkeletonText lines={5} />
            <SkeletonText lines={3} />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Equipment Not Found</h2>
        <Link to="/buy" className="text-primary">← Back to Inventory</Link>
      </div>
    );
  }

  // Render equipment details...
};
```

**Test Steps:**

1. Navigate to `/buy/equipment/:id`
2. **Expected:** See skeleton layout (image + text)
3. **Expected:** Layout matches final content structure
4. **Expected:** Equipment details load after API call
5. Navigate to `/buy/equipment/invalid-id`
6. **Expected:** "Equipment Not Found" error message

**Status:** [ ] ✅ Pass | [ ] ⏳ To Implement | [ ] ❌ Fail

---

#### SellPage

**File:** `src/pages/public/SellPage.tsx`

**If has form submission:**

- [ ] Form uses `useMutation` hook
- [ ] Submit button has `isLoading={mutation.isPending}`
- [ ] Form fields disabled during submission
- [ ] Success toast on submission
- [ ] Error toast on failure

**Test Steps:**

1. Navigate to `/sell`
2. Fill form
3. Click submit
4. **Expected:** Button shows loading spinner
5. **Expected:** Button disabled
6. **Expected:** Success toast after completion
7. **Expected:** Form resets (if configured)

**Status:** [ ] ✅ Pass | [ ] ⏳ Not Applicable

---

#### ContactUsPage

**File:** `src/pages/public/ContactUsPage.tsx`

**Required Implementations:**

- [ ] Form uses `useMutation` hook
- [ ] Submit button has `isLoading` prop
- [ ] Success toast shows
- [ ] Error toast shows
- [ ] Form resets on success

**Test Steps:**

1. Navigate to `/contact`
2. Fill contact form
3. Click "Send Message"
4. **Expected:** Button shows loading spinner
5. **Expected:** Button changes to "Sending..."
6. **Expected:** Success toast: "Message sent successfully!"
7. **Expected:** Form clears after success

**Status:** [ ] ✅ Pass | [ ] ⏳ To Implement | [ ] ❌ Fail

---

#### AboutUsPage

**File:** `src/pages/public/AboutUsPage.tsx`

- [ ] Static page, no loaders needed

**Status:** [ ] ✅ Confirmed Static

---

## 📋 Phase 4: Edge Cases & Performance

### 4.1 Concurrent Requests

**Test Steps:**

1. Navigate to homepage (loads featured equipment)
2. While loading, navigate to `/buy` (loads equipment list)
3. **Expected:** Both loaders work independently
4. **Expected:** No conflicts
5. Check Redux DevTools: Should see multiple simultaneous requests

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 4.2 Fast API Responses (No Flicker)

**Test Steps:**

1. Configure axios mock or backend to respond in < 100ms
2. Navigate to `/buy`
3. **Expected:** Loader should NOT flicker rapidly
4. **Expected:** Minimum 300ms display time (from `useScopedLoader` config)

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 4.3 Slow API Responses

**Test Steps:**

1. Throttle network to "Slow 3G"
2. Navigate to `/buy`
3. **Expected:** Skeleton loaders persist for entire duration
4. **Expected:** No timeout errors
5. **Expected:** Eventually loads or shows error

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 4.4 Network Offline

**Test Steps:**

1. Open DevTools → Network tab
2. Set to "Offline"
3. Try to navigate to `/buy`
4. **Expected:** Error state appears
5. **Expected:** Helpful error message
6. **Expected:** Retry button available
7. Go back online
8. Click retry
9. **Expected:** Successfully loads

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 4.5 Rapid Button Clicks

**Test Steps:**

1. On login page, rapidly click submit button 5 times
2. **Expected:** Only ONE request sent
3. **Expected:** Button remains disabled after first click
4. Check Network tab: Should see only 1 request

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 4.6 Navigation During Loading

**Test Steps:**

1. Navigate to `/buy`
2. While skeleton loaders showing, immediately navigate to `/`
3. **Expected:** Loader cleans up properly
4. **Expected:** No errors in console
5. **Expected:** Homepage loads normally

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

## 📋 Phase 5: Accessibility

### 5.1 Screen Reader Compatibility

**Test Steps (with screen reader enabled):**

1. Navigate to `/buy`
2. **Expected:** Screen reader announces "Loading equipment"
3. **Expected:** After load, announces "Equipment list loaded"
4. Submit login form
5. **Expected:** Announces "Logging in"

**Check in Code:**

- [ ] GlobalLoader has `role="progressbar"`
- [ ] GlobalLoader has `aria-label` or `aria-live`
- [ ] Skeleton loaders have `aria-busy="true"` on container

**Status:** [ ] ✅ Pass | [ ] ⏳ Pending

---

### 5.2 Keyboard Navigation

**Test Steps (using only keyboard):**

1. Navigate to login page
2. Tab to email field → enter email
3. Tab to password field → enter password
4. Tab to submit button
5. Press Enter
6. **Expected:** Form submits
7. **Expected:** Button remains focusable (not removed from DOM)
8. **Expected:** Focus management after loading completes

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

### 5.3 Focus Management

**Test Steps:**

1. On Buy page, click a filter checkbox
2. Click "Apply Filters"
3. **Expected:** Focus remains on filter button OR moves to results
4. **Expected:** Not lost entirely

**Status:** [ ] ✅ Pass | [ ] ⏳ Pending

---

## 📋 Phase 6: Visual Quality

### 6.1 No Layout Shift

**Test Steps:**

1. Navigate to `/buy` with throttled network
2. Watch skeleton cards load → then real cards
3. **Expected:** Zero layout shift
4. Use Chrome DevTools → Performance → Record
5. Check "Cumulative Layout Shift" score
6. **Expected:** CLS score < 0.1

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

**CLS Score:** \***\*\_\_\_\*\***

---

### 6.2 Skeleton Accuracy

**For each skeleton loader, verify:**

- [ ] BuyPage - Skeleton cards match equipment card dimensions
- [ ] HomePage - Skeleton cards match featured equipment cards
- [ ] BuyNowDetails - Skeleton layout matches detail page layout

**Visual Comparison:**

```
[ ] Skeleton height matches real content
[ ] Skeleton width matches real content
[ ] Skeleton has similar padding/margins
[ ] Number of skeleton elements matches real content
```

**Status:** [ ] ✅ Pass | [ ] ❌ Needs Adjustment

---

### 6.3 Smooth Animations

**Test Steps:**

1. Navigate to pages with loaders
2. **Expected:** Shimmer animation is smooth (no jank)
3. **Expected:** Fade in/out transitions are smooth
4. Open DevTools → Performance
5. Record loading sequence
6. Check FPS (should be steady 60fps)

**Status:** [ ] ✅ Pass | [ ] ❌ Fail

---

## 📋 Final Production Checklist

### Pre-Deployment

- [ ] All pages tested with loaders
- [ ] All API endpoints configured correctly
- [ ] No console errors related to loaders
- [ ] Redux DevTools shows proper loader state
- [ ] Performance metrics within acceptable range
- [ ] Accessibility audit passed
- [ ] Visual regression tests passed
- [ ] Error scenarios handled gracefully

### Documentation

- [ ] Loader patterns documented for team
- [ ] API loader configuration guide updated
- [ ] Component usage examples provided
- [ ] Troubleshooting guide available

### Monitoring

- [ ] Setup monitoring for loader-related errors
- [ ] Track metrics: loader display duration
- [ ] Track metrics: failed API calls
- [ ] Track metrics: user complaints about loading

---

## 📊 Summary Report

### Implementation Status

**Total Pages:** **\_** / **\_**
**Completed:** **\_**
**Pending:** **\_**
**Issues:** **\_**

### Test Results

**Passed:** **\_** / **\_**
**Failed:** **\_** / **\_**
**Pending:** **\_** / **\_**

### Performance Metrics

- **Average Load Time:** **\_** ms
- **Skeleton Display Time:** **\_** ms
- **CLS Score:** **\_**
- **Accessibility Score:** **\_** / 100

### Critical Issues

```
[List any critical issues that need immediate attention]
```

### Non-Critical Issues

```
[List nice-to-have improvements]
```

---

## 🎓 Sign-Off

### Developer Sign-Off

- [ ] All loaders implemented according to spec
- [ ] Code reviewed and tested
- [ ] Documentation updated

**Name:** **\*\***\_\_\_**\*\***
**Date:** **\*\***\_\_\_**\*\***
**Signature:** **\*\***\_\_\_**\*\***

### QA Sign-Off

- [ ] All test scenarios executed
- [ ] Edge cases verified
- [ ] Performance acceptable
- [ ] No critical bugs

**Name:** **\*\***\_\_\_**\*\***
**Date:** **\*\***\_\_\_**\*\***
**Signature:** **\*\***\_\_\_**\*\***

---

**Last Updated:** 2026-01-24
**Version:** 1.0
**Status:** Ready for Use ✅
