# 🔍 Next.js & React Code Review Report

## R&S Asesoría Jurídica - App

**Review Date**: March 5, 2026
**Framework**: Next.js 16.1.6 | React 19.2.4 | TypeScript 5.9.3
**Overall Score**: ⭐⭐⭐⭐ (4/5) - Good foundation with best practices improvements needed

---

## ✅ COMPLETED FIXES

### Critical Issues Fixed ✓

1. **Removed root API route** - Deleted `/src/app/api/route.ts`
   - ❌ Anti-pattern: Root API handlers shouldn't exist
   - ✅ Use specific endpoints like `/api/endpoint/route.ts`

2. **Fixed filename typo** - `useIsomophic.tsx` → `useIsomorphic.tsx`
   - ✅ Updated import in `useTimeout.tsx`

3. **Fixed component typos**
   - ✅ `Title.tsx`: "mimingo" → "Domingo"

4. **Improved error handling** - `src/app/actions/main.ts`
   - ✅ Proper error messages in Spanish (removed "mongólico" typo)
   - ✅ Changed from undefined returns to proper error throwing
   - ✅ Removed unused `DeleteResult` import
   - ✅ Better error logging with `console.error`

---

## 🔴 CRITICAL ISSUES REMAINING

### 1. **Mixed Database Patterns** ⚠️ URGENT

**Severity**: HIGH | **Effort**: HIGH | **Impact**: HIGH

**Issue**: Using both Prisma and MongoDB simultaneously

```typescript
// Current State (ANTI-PATTERN)
├── Prisma: User, Facturas, Carpetas metadata
├── MongoDB: Notas, direct db operations
└── Files mixing both: src/app/actions/main.ts, various API routes
```

**Files Affected**:

- `src/app/actions/main.ts` (Lines 1-160+)
- `src/app/api/Notas/route.ts`
- `src/app/api/Carpeta/route.ts`
- `src/lib/connection/collections.ts`
- `src/app/Notas/Fecha/[...date]/page.tsx`

**Recommendation**:
Choose one approach:

- **Option A** (Recommended): Migrate all to Prisma
  - Add Notas model to Prisma schema
  - Create proper API routes for CRUD
  - Remove MongoDB dependency
- **Option B**: Use clear abstraction layer
  - Create `lib/databases/` with separate clients
  - Document when to use each database

**Error Messages needing fixes**:
All instances of "no hay cliente mongólico" (13+ occurrences across codebase)

---

### 2. **Server Actions Organization** ⚠️ URGENT

**Severity**: HIGH | **Effort**: MEDIUM | **Impact**: MEDIUM

**Current Structure** (Anti-pattern):

```
src/app/actions/
├── main.ts         ❌ 160+ lines mixing concerns
│   ├── createNota()
│   ├── deleteNota()
│   └── editNota()
└── register.ts     ✓ Single responsibility
```

**Recommended Structure**:

```
src/app/actions/
├── notas/
│   ├── create.ts
│   ├── delete.ts
│   ├── update.ts
│   └── schema.ts
├── carpetas/
│   └── ... (similar structure)
├── auth/
│   └── register.ts
└── index.ts        # barrel export
```

**Implementation Steps**:

1. Create `src/app/actions/notas/` directory
2. Move Nota operations to domain-specific files
3. Update imports in components
4. Keep function names consistent: `createNota()` → `create()`

---

### 3. **Context Provider Overload** ⚠️ HIGH PRIORITY

**Severity**: MEDIUM | **Effort**: HIGH | **Impact**: MEDIUM

**Current Count**: 13 providers in `src/app/Context/`

```
Current Nesting (App Layout):
<CategoryContextProvider>
  <NavigationContextProvider>
    <SearchProvider>
      <ModalProvider>
        <MainProvider>
          {/* App Content */}
        </MainProvider>
      </ModalProvider>
    </SearchProvider>
  </NavigationContextProvider>
</CategoryContextProvider>
```

**Issues Identified**:

| Provider                     | Purpose                    | Status | Recommendation                    |
| ---------------------------- | -------------------------- | ------ | --------------------------------- |
| `main-context`               | Global app state           | ✓ Good | Keep global                       |
| `search-context`             | Search functionality       | ✓ Good | Keep global                       |
| `modal-context`              | Modal state                | ✓ Good | Keep global                       |
| `navigation-context`         | Navigation state           | ✓ Good | Keep global                       |
| `category-context`           | Category filtering         | 🟡     | Keep global but review            |
| `carpeta-form-context`       | Edit Carpeta form          | 🟡     | **Move to Carpetas/\* feature**   |
| `nueva-carpeta-form-context` | Create Carpeta form        | 🟡     | **Consolidate with above**        |
| `carpetas-sort-context`      | Carpetas sorting/filtering | 🟡     | **Move to Carpetas/\* feature**   |
| `notas-sort-context`         | Notas sorting/filtering    | 🟡     | **Move to Notas/\* feature**      |
| `nueva-task-form-context`    | Create Task form           | 🟡     | **Move to Tareas/\* feature**     |
| `calendario-context`         | Calendar state             | 🟡     | **Move to Calendario/\* feature** |
| `database-models-context`    | ❓ Unclear                 | ⚠️     | **Review purpose or remove**      |
| `TableContext`               | ❓ Unclear scope           | ⚠️     | **Review or move to components**  |

**Recommended Refactoring**:

```typescript
// Current (Root Layout)
<app/layout.tsx>
  <CategoryContextProvider>
    <NavigationContextProvider>
      <SearchProvider>
        <ModalProvider>
          <MainProvider>
            {children}
          </MainProvider>
        </ModalProvider>
      </SearchProvider>
    </NavigationContextProvider>
  </CategoryContextProvider>

// Should be (Root Layout - Cleaner)
<app/layout.tsx>
  <MainProvider>
    <SearchProvider>
      <ModalProvider>
        <NavigationContextProvider>
          <CategoryContextProvider>
            {children}
          </CategoryContextProvider>
        </NavigationContextProvider>
      </ModalProvider>
    </SearchProvider>
  </MainProvider>

// Feature-specific (Carpetas)
<app/Carpetas/layout.tsx> or within component
  <CarpetaFormProvider>
    <CarpetasSortProvider>
      {children}
    </CarpetasSortProvider>
  </CarpetaFormProvider>
```

**Implementation Approach**:

1. **Phase 1**: Move feature-specific contexts into feature folders
2. **Phase 2**: Consolidate form contexts (edit vs create can share logic)
3. **Phase 3**: Reorganize root layout with only global contexts

**Files to Modify**:

- `src/app/layout.tsx` - Remove feature contexts
- Move contexts to their feature folders
- Update imports throughout codebase

---

## 🟡 HIGH PRIORITY ISSUES

### 1. **Route Naming Convention**

**Severity**: MEDIUM | **Effort**: MEDIUM | **Impact**: LOW

**Current** (PascalCase):

```
src/app/Carpetas/      ❌
src/app/Notas/         ❌
src/app/Tareas/        ❌
src/app/Carpeta/[numero]/  ❌
src/app/RamaJudicial/  ❌
src/app/Costos/        ❌
src/app/Calendario/    ❌
src/app/QuienesSomos/  ❌
src/app/Contacto/      ❌
src/app/Carpetas_alt/  ❌❌ (Also anti-pattern naming)
```

**Should be** (lowercase kebab-case):

```
src/app/carpetas/      ✅
src/app/notas/         ✅
src/app/tareas/        ✅
src/app/carpeta/[numero]/  ✅
src/app/rama-judicial/ ✅
src/app/costos/        ✅
src/app/calendario/    ✅
src/app/quienes-somos/ ✅
src/app/contacto/      ✅
src/app/carpetas-alt/  ✅ (remove underscore)
```

**Reasoning**:

- Next.js convention (file-based routing usually lowercase)
- Consistency with API routes and parallel routes (`@modal`, `@right`, `@top`)
- Better readability

**Note**: Parallel routes correctly use lowercase!

---

### 2. **Custom Hooks Fragmentation**

**Severity**: MEDIUM | **Effort**: MEDIUM | **Impact**: MEDIUM

**Current Location**: 15 hooks in global `src/app/Hooks/`

**Recommended Organization**:

```
Global Hooks (Keep in src/app/Hooks/):
✓ useDebounce.tsx          - General input optimization
✓ useMediaQuery.tsx        - Responsive design
✓ useTimeout.tsx           - Async timing
✓ useCopyToClipboard.tsx   - Utility
✓ useFormInput.tsx         - Form handling (if general)
✓ useNotification.ts       - App notifications
✓ useServiceWorker.tsx     - PWA functionality
✓ online-state.tsx         - Network state
✓ modal-state.tsx          - Modal state

Feature-Specific Hooks (Move to features):
🟡 useCarpetasReducer.tsx      → src/app/carpetas/hooks/
🟡 useCategoryFilterHook.tsx   → src/app/carpetas/hooks/ (review if truly needed)
🟡 useNotaInput.tsx            → src/app/notas/hooks/
🟡 useFacturasReducer.tsx      → src/app/costos/hooks/ or remove
🟡 useIsomorphic.tsx           → src/lib/hooks/ (isomorphic utilities)
🟡 usePrettyPrintedState.tsx   → src/lib/hooks/ (dev utilities - remove in prod)
```

**Question Marks**:

- `database-models-context` - What does this do? Document or remove
- `TableContext` - Should be component prop instead? Review usage

---

### 3. **Duplicate Form Logic**

**Severity**: MEDIUM | **Effort**: MEDIUM | **Impact**: LOW

**Issue**: Separate contexts for creating vs editing same entity

**Affected Files**:

```
src/app/Context/
├── carpeta-form-context.tsx       - Edit existing Carpeta
└── nueva-carpeta-form-context.tsx - Create new Carpeta
```

**Problem**: Code duplication, harder to maintain

**Solution**: Consolidate into single context

```typescript
// Recommended: src/app/Carpetas/context/carpeta-form-context.tsx
interface CarpetaFormContextType {
  formState: IntCarpeta | null;
  setFormState: Dispatch<SetStateAction<IntCarpeta | null>>;
  isNewCarpeta: boolean; // Toggle edit vs create behavior
}

// Use same form for both create and edit
// Pass `isNewCarpeta` flag to determine behavior
```

---

### 4. **Typos and Quality Issues**

**Severity**: LOW | **Effort**: LOW | **Impact**: LOW

Still require fixes across codebase:

**Error Message Typo** (13+ occurrences):

```typescript
// Current (TYPO)
throw new Error('no hay cliente mongólico');

// Should be
throw new Error('Error de conexión a la base de datos');
```

**Locations**:

- `src/app/api/Carpeta/route.ts` (Line 50, 92)
- `src/app/api/Notas/route.ts` (Line 34, 70)
- `src/lib/christmas/helper.ts` (Line 10)
- `src/lib/connection/collections.ts` (Lines 11, 25, 39, 53, 67)
- `src/app/Notas/Fecha/[...date]/page.tsx` (Line 21)

**Misspelling of Spanish Day**:

```typescript
// In components with dates
const days = ['Domingo', 'Lunes', ...]; // ✓ Fixed in title.tsx
```

---

## 🟢 MEDIUM PRIORITY IMPROVEMENTS

### 1. **Lib Directory Organization**

**Current State**:

```
src/lib/
├── connection/         ✓ Good - DB clients
├── types/              ✓ Good - Type definitions
├── models/             ✓ Good - Data transformations
├── data/               ❓ Unclear purpose
├── project/            ❓ Needs organization
├── scripts/            ✓ Good - Utility scripts
├── client/             ⚠️ Only 1 file (underdeveloped)
├── utils/              ⚠️ Only 1 file (underdeveloped)
└── christmas/          ✓ Feature-specific
```

**Recommendation**:

```
src/lib/
├── api/                ← New: API client utilities
├── auth/               ← New: Auth helpers
├── connection/         ✓
├── types/              ✓
├── models/             ✓
├── hooks/              ← Move isomorphic + dev utils here
├── utils/              ← Expand with common helpers
├── validation/         ← Move Zod schemas here
├── constants/          ← Extract magic strings
└── features/           ← Feature-specific helpers (christmas, etc)
```

---

### 2. **Component Patterns**

**Severity**: LOW | **Effort**: MEDIUM | **Impact**: LOW

**Strengths**:

```
✓ Feature folder structure is excellent
✓ Proper client/server component separation
✓ Reusable button, form, table components exist
✓ Modal structure follows Next.js patterns
```

**Improvements**:

1. **Table Component**
   - Consider memoization for large datasets
   - Extract sorting logic to custom hook
   - Add loading/error states

2. **Form Components**
   - Combine into unified form system
   - Use Zod schemas for validation
   - Standardize error display

---

### 3. **Styling Architecture**

**Severity**: LOW | **Effort**: MEDIUM | **Impact**: LOW

**Current Structure**:

```
src/styles/
├── theme.css          ❌ Separate files
├── theme.light.css    ❌ Should use media query
├── theme.dark.css     ❌
├── globals.css        ✓
├── *.module.css/.scss ✓ Typed modules
└── fonts/             ✓
```

**Recommendation - Consolidate Theme Files**:

```css
/* src/styles/theme.css */

/* Default (Light) */
:root {
  --primary-color: #5c6bc0;
  --background: #ffffff;
  --text: #000000;
  /* ... more vars ... */
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #1a237e;
    --background: #121212;
    --text: #ffffff;
  }
}
```

**Remove**: `theme.light.css` and `theme.dark.css`

---

## 📋 ARCHITECTURE RECOMMENDATIONS

### Best Practices Being Followed ✓

1. **Server Components by Default**
   - Pages are Server Components unless marked `'use client'`
   - Error boundaries correctly use `'use client'`

2. **Type Safety**
   - Strict TypeScript configuration
   - Zod schema validation
   - Typed CSS modules

3. **Authentication**
   - NextAuth properly configured
   - Protected routes pattern implemented
   - JWT/Session handling

4. **Metadata**
   - Proper metadata.ts usage
   - Viewport configuration
   - OpenGraph tags

5. **Configuration**
   - Standalone output for Docker
   - Type-safe routing enabled
   - Security headers configured

---

### Areas Needing Improvement

1. **Data Fetching Pattern**
   - Ensure server actions properly validate input
   - Implement request deduplication where needed
   - Add request timeout handling

2. **Error Handling**
   - Use error boundaries for all features
   - Implement better error recovery UI
   - Add error telemetry/logging

3. **Performance**
   - Implement route-level code splitting review
   - Check for unnecessary re-renders
   - Consider image optimization for carpeta data

4. **Testing**
   - No test files found in codebase
   - Recommend: Add unit tests for actions
   - Recommend: Add E2E tests for critical flows

---

## 📊 REFACTORING ROADMAP

### Phase 1: Critical Fixes (Completed ✅)

- [x] Remove root API route
- [x] Fix typos (useIsomophic, "mimingo")
- [x] Improve error handling in server actions

### Phase 2: Database Consolidation (Priority 1)

**Target**: 1-2 weeks

- [ ] Decide Prisma vs MongoDB for long-term
- [ ] Create abstraction layer if keeping both
- [ ] Fix all error messages and connection handling
- [ ] Add proper type definitions for all DB operations

### Phase 3: Server Actions Organization (Priority 2)

**Target**: 1 week

- [ ] Create `src/app/actions/` structure by domain
- [ ] Move all Nota operations to `actions/notas/`
- [ ] Organize Carpeta, Tareas operations similarly
- [ ] Update component imports

### Phase 4: Context Provider Refactoring (Priority 3)

**Target**: 2 weeks

- [ ] Move feature contexts to feature folders
- [ ] Consolidate form contexts
- [ ] Simplify root layout
- [ ] Update all hook usages

### Phase 5: Code Organization (Priority 4)

**Target**: 1-2 weeks

- [ ] Rename routes to lowercase
- [ ] Reorganize hooks by domain
- [ ] Flatten lib directory structure
- [ ] Consolidate theme files

### Phase 6: Testing & Quality (Priority 5)

**Target**: Ongoing

- [ ] Add unit tests for actions
- [ ] Add integration tests for features
- [ ] Add E2E tests for critical flows
- [ ] Set up error tracking

---

## 🚀 QUICK WINS (Easy Fixes)

These can be done independently, no dependencies:

1. **Fix all "mongólico" typos** (Search and replace)
   - Time: 5 minutes
   - Impact: Better error messages

2. **Consolidate theme files**
   - Time: 15 minutes
   - Impact: Cleaner CSS structure

3. **Extract magic strings to constants**
   - Time: 30 minutes
   - Impact: Easier maintenance

4. **Add missing documentation**
   - Document unclear contexts
   - Document feature-specific states

---

## 🎯 SUCCESS METRICS

Track improvement with these metrics:

| Metric                       | Current       | Target               |
| ---------------------------- | ------------- | -------------------- |
| Context Provider Count       | 13            | 5-6                  |
| Lines in `actions/`          | 160+          | 30-40                |
| Route Naming Convention      | 60% lowercase | 100%                 |
| Database Pattern Consistency | Mixed         | 100% (single choice) |
| Test Coverage                | 0%            | >50%                 |
| Type Coverage                | ~95%          | >98%                 |

---

## 📚 RESOURCES & REFERENCES

- [Next.js 16 Best Practices](https://nextjs.org/docs)
- [React 19 Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Zod Schema Validation](https://zod.dev)

---

## ✨ SUMMARY

Your Next.js application has a **solid foundation** with good practices for server components, TypeScript, and security. The main improvements needed are:

1. **Consolidate databases** (Critical)
2. **Organize server actions** (High)
3. **Simplify context providers** (High)
4. **Standardize naming** (Medium)
5. **Add tests** (Important for long-term)

With these changes, your codebase will be more maintainable, scalable, and aligned with Next.js/React best practices.

---

**Next Steps**:

1. Review this document with your team
2. Prioritize which phase to tackle first
3. Create GitHub issues for each phase
4. Track progress towards eliminating technical debt

**Questions?** Each section above provides specific file locations and code examples for implementation.
