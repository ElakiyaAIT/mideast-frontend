# ⚡ Quick Test Guide - API Loader Integration

## 🎯 Test the Foundation (Do This NOW!)

### Prerequisites

```bash
# Make sure your app is running
npm run dev
```

---

## Test 1: Verify Interceptor is Active (2 minutes)

### Steps:

1. Open your app in Chrome: `http://localhost:5173`
2. Open Chrome DevTools (F12)
3. Go to "Redux" tab (install Redux DevTools if not installed)
4. Look for `loader` in the state tree

### Expected Result:

```javascript
// You should see this in Redux state:
{
  loader: {
    isGlobalLoading: false,
    globalMessage: null,
    activeRequests: {},
    requestCountByNamespace: {},
    scopedLoaders: {}
  }
}
```

### ✅ Pass Criteria:

- `loader` state exists in Redux
- No console errors on page load

### ❌ If Failed:

- Check `src/main.tsx` has the interceptor setup
- Refresh browser with cache clear (Ctrl+Shift+R)
- Check browser console for errors

---

## Test 2: Global Loader on Login (2 minutes)

### Steps:

1. Navigate to login page: `http://localhost:5173/login`
2. Keep Redux DevTools open
3. Enter any email/password
4. Click "Sign In" button
5. Watch both:
   - The UI (should show full-page loader)
   - Redux DevTools (should show actions)

### Expected Result:

**Visual:**

- Full-page overlay appears
- "Logging in..." message displays
- Spinner animation is visible
- UI is blocked (can't click anything)
- Loader disappears after API completes

**Redux DevTools Actions:**

```
1. @@redux/INIT
2. loader/startRequest {
     id: "post-/auth/login-1234567890-abc123",
     namespace: "auth",
     type: "global",
     message: "Logging in..."
   }
3. loader/endRequest "post-/auth/login-1234567890-abc123"
```

### ✅ Pass Criteria:

- Global loader appears immediately
- Message "Logging in..." is visible
- Loader disappears after API call
- Both Redux actions fired

### ❌ If Failed:

- Check `src/api/authApi.ts` has `enableGlobalLoader()` on login
- Check GlobalLoader component is in App.tsx
- Check no console errors

---

## Test 3: Silent Logout (2 minutes)

### Steps:

1. Login successfully first (from Test 2)
2. Once logged in, open Redux DevTools
3. Click logout button
4. Watch carefully - NO loader should appear

### Expected Result:

- Immediate redirect to login page
- NO global loader visible
- NO "loading..." message
- Fast, instant logout

**Redux DevTools:**

```
Should NOT see:
- loader/startRequest for logout
- loader/showGlobalLoader

Should see:
- Direct navigation to /login
```

### ✅ Pass Criteria:

- No visible loader during logout
- Fast, instant logout experience
- Redirect happens immediately

### ❌ If Failed:

- Check `src/api/authApi.ts` has `disableLoader()` on logout
- Verify logout actually calls the API

---

## Test 4: Button Loading on Login (1 minute)

### Steps:

1. Go to login page
2. Look at "Sign In" button
3. Click it
4. Watch the button (not the page)

### Expected Result:

- Button shows spinner icon
- Button text changes to "Loading..."
- Button is disabled (can't click again)
- Button returns to normal after API completes

### ✅ Pass Criteria:

- Button has visual loading state
- Button is disabled during loading
- Loading state clears after completion

### ❌ If Failed:

- Check LoginPage uses `isLoading={loginMutation.isPending}`
- Check Button component has isLoading prop

---

## Test 5: Check Network Tab (1 minute)

### Steps:

1. Open DevTools → Network tab
2. Try to login
3. Look for `/auth/login` request
4. Check request headers

### Expected Result:

- `/auth/login` POST request appears
- Request completes successfully (200 OK)
- Response has expected structure

### ✅ Pass Criteria:

- API call is made
- No network errors
- Response is received

---

## 🎉 Success Checklist

If all tests pass, you can confirm:

- [x] API interceptor is active and tracking requests
- [x] Global loader appears for login
- [x] Silent operations (logout) don't show loader
- [x] Button loading states work
- [x] Redux state is properly managed
- [x] No console errors

**Status:** ✅ Foundation is working correctly!

**Next Step:** Proceed to integrate pages (BuyPage, HomePage, etc.)

---

## 🐛 Common Issues & Solutions

### Issue: Redux DevTools not showing

**Solution:**

```bash
# Install Redux DevTools extension
# Chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
```

### Issue: "setupApiLoaderInterceptor is not a function"

**Solution:**

- Check `src/utils/apiLoaderInterceptor.ts` exists
- Check import path in main.tsx is correct
- Restart dev server

### Issue: Loader never disappears

**Solution:**

- Check API call is completing (Network tab)
- Check `endRequest` action fires in Redux
- Check for JavaScript errors in console

### Issue: TypeScript errors

**Solution:**

```bash
# Restart TypeScript server
npm run type-check

# Or in VS Code:
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## 📊 What to Test Next

After foundation tests pass:

1. **Test Equipment API** (when pages integrated)
   - Navigate to BuyPage
   - Should see skeleton loaders
   - Should load equipment list

2. **Test Featured Equipment** (when pages integrated)
   - Navigate to HomePage
   - Should see 3 skeleton cards
   - Should load featured items

3. **Test Form Submissions** (when integrated)
   - Contact form
   - Profile update
   - All should show button loading

---

## 🎯 Test Completion Time

- Foundation Tests: ~10 minutes
- Page Integration Tests: ~30 minutes after pages are updated
- Full QA: ~1 hour

---

## 📞 Need Help?

**If tests fail:**

1. Check `IMPLEMENTATION_STATUS.md` - verify all files were updated
2. Check browser console for errors
3. Check Redux DevTools for state issues
4. Restart dev server
5. Clear browser cache

**If tests pass:**
🎉 Congratulations! Your API loader foundation is working.

Now proceed to:

- `LOADER_CODE_EXAMPLES.md` - Copy page implementations
- `LOADER_VERIFICATION_CHECKLIST.md` - Full testing guide

---

**Last Updated:** 2026-01-24  
**Quick Test Duration:** 10 minutes  
**Status:** Ready to test!
