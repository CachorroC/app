# 🔧 ACTION ITEMS CHECKLIST

## Priority 1: Fix Database Error Messages

**Impact**: Better error handling, cleaner error messages
**Time Estimate**: 30 minutes

### Files Requiring "mongólico" → "Error de conexión a la base de datos" Fix

- [x] ~~`src/app/actions/main.ts`~~ (COMPLETED)
- [ ] `src/app/api/Carpeta/route.ts` (Line 50, 92)
- [ ] `src/app/api/Notas/route.ts` (Line 34, 70)
- [ ] `src/lib/christmas/helper.ts` (Line 10)
- [ ] `src/lib/connection/collections.ts` (Lines 11, 25, 39, 53, 67)
- [ ] `src/app/Notas/Fecha/[...date]/page.tsx` (Line 21)

**Bash Command** (Search all instances):

```bash
grep -r "no hay cliente mongólico" src/
```

**Replacement Pattern**:

```typescript
// OLD
throw new Error('no hay cliente mongólico');

// NEW
throw new Error('Error de conexión a la base de datos');
```

---

## Priority 2: Database Consolidation Strategy

**Impact**: Long-term maintainability
**Time Estimate**: 1-2 weeks

### Step 1: Audit MongoDB Usage

- [ ] List all MongoDB collections in use
- [ ] List all Prisma tables in use
- [ ] Document which entities use which database

### Step 2: Make Decision

- [ ] Option A: Migrate all to Prisma
  - [ ] Add missing models: Notas, etc.
  - [ ] Update `prisma/schema.prisma`
  - [ ] Run `prisma migrate dev`
  - [ ] Update all queries
- [ ] Option B: Keep both with clear separation
  - [ ] Create `/lib/databases/` directory
  - [ ] Separate MongoDB and Prisma clients
  - [ ] Document clear division

### Step 3: Update API Routes

- [ ] Refactor `/api/Carpeta/route.ts`
- [ ] Refactor `/api/Notas/route.ts`
- [ ] Add request validation
- [ ] Add proper error handling

---

## Priority 3: Server Actions Organization

**Impact**: Better code maintainability
**Time Estimate**: 1 week

### Current Structure

```
src/app/actions/
├── main.ts (160+ lines) ← NEEDS REFACTORING
└── register.ts (5 lines)
```

### Target Structure

```
src/app/actions/
├── notas/
│   ├── create.ts        (createNota logic)
│   ├── update.ts        (editNota logic)
│   ├── delete.ts        (deleteNota logic)
│   └── schema.ts        (validation)
├── auth/
│   └── register.ts      (existing)
├── carpetas/
│   └── ... (similar structure)
├── index.ts             (barrel export)
└── errors.ts            (shared error types)
```

### Implementation Steps

1. [ ] Create folder structure
2. [ ] Create `src/app/actions/notas/create.ts`:

   ```typescript
   'use server';
   import { revalidateTag } from 'next/cache';
   import { ZodNotaElementSchema } from '#@/lib/types/zod/nota';
   import clientPromise from '#@/lib/connection/mongodb';

   export async function create(formData: FormData) {
     // Existing createNota logic here
   }
   ```

3. [ ] Create `src/app/actions/notas/update.ts`
4. [ ] Create `src/app/actions/notas/delete.ts`
5. [ ] Create `src/app/actions/index.ts` (barrel export)
6. [ ] Update all imports in components
7. [ ] Delete old `src/app/actions/main.ts`

### Components to Update

Search for `createNota`, `deleteNota`, `editNota` imports:

```bash
grep -r "from.*actions/main" src/
grep -r "createNota\|editNota\|deleteNota" src/ --include="*.tsx"
```

---

## Priority 4: Context Provider Consolidation

**Impact**: Simpler component tree, better performance
**Time Estimate**: 2 weeks

### Step 1: Move Feature-Specific Contexts

- [ ] Create `src/app/carpetas/context/` directory
  - [ ] Move `carpeta-form-context.tsx`
  - [ ] Move `nueva-carpeta-form-context.tsx` (merge into one)
  - [ ] Move `carpetas-sort-context.tsx`

- [ ] Create `src/app/notas/context/` directory
  - [ ] Move `notas-sort-context.tsx`

- [ ] Create `src/app/tareas/context/` directory
  - [ ] Move `nueva-task-form-context.tsx`

- [ ] Create `src/app/calendario/context/` directory
  - [ ] Move `calendario-context.tsx`

### Step 2: Consolidate Form Contexts

**Before** (2 contexts):

```
carpeta-form-context.tsx  (Edit mode)
nueva-carpeta-form-context.tsx (Create mode)
```

**After** (1 context):

```typescript
// src/app/carpetas/context/carpeta-form-context.tsx
export function CarpetaFormProvider({
  children,
  initialCarpeta,
  isNew = false,
}: {
  children: ReactNode;
  initialCarpeta?: IntCarpeta;
  isNew?: boolean;
}) {
  // Shared logic, isNew flag determines behavior
}
```

### Step 3: Clean Up Root Layout

**Current** `src/app/layout.tsx`:

```tsx
<CategoryContextProvider>
  <NavigationContextProvider>
    <SearchProvider>
      <ModalProvider>
        <MainProvider>{children}</MainProvider>
      </ModalProvider>
    </SearchProvider>
  </NavigationContextProvider>
</CategoryContextProvider>
```

**Updated**:

```tsx
<MainProvider>
  <SearchProvider>
    <ModalProvider>
      <NavigationContextProvider>
        <CategoryContextProvider>{children}</CategoryContextProvider>
      </NavigationContextProvider>
    </ModalProvider>
  </SearchProvider>
</MainProvider>
```

### Step 4: Update All Imports

```bash
# Find all imports of moved contexts
grep -r "Context/carpeta-form" src/
grep -r "Context/nueva-carpeta" src/
grep -r "Context/carpetas-sort" src/
grep -r "Context/notas-sort" src/
grep -r "Context/nueva-task" src/
grep -r "Context/calendario" src/

# Update to new paths:
# FROM: ../Context/carpeta-form-context
# TO: ./context/carpeta-form-context
```

### Verification

- [ ] Test each feature still works
- [ ] Check console for any missing provider errors
- [ ] Verify form state is properly isolated

---

## Priority 5: Route Naming Convention

**Impact**: Consistency, readability
**Time Estimate**: 1 week (large refactoring)

### Routes to Rename

**App Routes**:

- [ ] `Carpetas/` → `carpetas/`
- [ ] `Notas/` → `notas/`
- [ ] `Tareas/` → `tareas/`
- [ ] `Carpeta/` → `carpeta/`
- [ ] `RamaJudicial/` → `rama-judicial/`
- [ ] `Costos/` → `costos/`
- [ ] `Calendario/` → `calendario/`
- [ ] `QuienesSomos/` → `quienes-somos/`
- [ ] `Contacto/` → `contacto/`
- [ ] `Carpetas_alt/` → `carpetas-alt/`

**Update Affected**:

- [ ] Navigation links (breadcrumbs, menus)
- [ ] Route-based contexts
- [ ] Links in components
- [ ] Metadata generation

**Commands**:

```bash
# Rename directories
mv src/app/Carpetas src/app/carpetas
mv src/app/Notas src/app/notas
# ... etc

# Find affected imports
grep -r "Carpetas\|Notas\|Tareas" src/ --include="*.tsx" | grep -v "import type" | grep -v "// "

# Update navigation
# Check: src/components/layout/NavBar.tsx
# Check: src/app/*/layout.tsx
```

---

## Priority 6: Hooks Organization

**Impact**: Code maintainability, discoverability
**Time Estimate**: 1 week

### Current Location

```
src/app/Hooks/  (15 hooks)
```

### Target Structure

```
src/app/Hooks/                    (Keep global utilities)
├── useDebounce.tsx               ✓
├── useMediaQuery.tsx              ✓
├── useTimeout.tsx                 ✓
├── useCopyToClipboard.tsx         ✓
├── useNotification.ts             ✓
├── useServiceWorker.tsx           ✓
├── modal-state.tsx                ✓
└── online-state.tsx               ✓

src/app/carpetas/hooks/           (NEW - Feature specific)
├── useCarpetasReducer.ts
├── useCategoryFilter.ts           (review if needed)
└── index.ts

src/app/notas/hooks/              (NEW)
├── useNotaInput.ts
└── index.ts

src/app/costos/hooks/             (NEW)
└── useFacturasReducer.ts

src/lib/hooks/                    (NEW - Isomorphic & Utilities)
├── useIsomorphic.ts
└── usePrettyPrintedState.ts      (remove in production)
```

### Implementation

1. [ ] Create feature hook directories
2. [ ] Move domain-specific hooks
3. [ ] Create index.ts files in each (barrel exports)
4. [ ] Update imports throughout codebase
5. [ ] Delete old hooks from `src/app/Hooks/`

---

## Priority 7: Lib Directory Cleanup

**Impact**: Better organization, discoverability
**Time Estimate**: 1 week

### Current State

```
src/lib/
├── chopper-test.ts
├── fetchWithSmartRetry.ts
├── schema.json
├── christmas/
├── client/
├── connection/
├── data/
├── models/
├── project/
├── scripts/
├── types/
└── utils/
```

### Target State

```
src/lib/
├── api/                    (API utilities)
│   ├── client.ts
│   └── retry.ts
├── auth/                   (Auth helpers)
│   └── ...
├── connection/             (DB clients)
│   ├── prisma.ts
│   └── mongodb.ts
├── types/                  (Type definitions)
│   ├── carpetas.ts
│   ├── notas.ts
│   ├── zod/
│   └── index.ts
├── models/                 (Data transformations)
│   └── ...
├── hooks/                  (Reusable hooks)
│   ├── useIsomorphic.ts
│   └── index.ts
├── utils/                  (Utility functions)
│   ├── dates.ts
│   ├── formatting.ts
│   └── index.ts
├── constants/              (App constants)
│   └── ...
└── features/               (Feature-specific)
    └── christmas/
```

### Implementation

1. [ ] Create new directories
2. [ ] Organize files logically
3. [ ] Update imports throughout codebase
4. [ ] Create barrel exports (index.ts)

---

## Quick Wins (Low Effort, High Value)

### 1. Theme File Consolidation

**Time**: 15 minutes

**Current** (3 files):

- `src/styles/theme.css`
- `src/styles/theme.light.css`
- `src/styles/theme.dark.css`

**Action**:

1. [ ] Merge all into single `src/styles/theme.css`
2. [ ] Use CSS variables with `@media (prefers-color-scheme: dark)`
3. [ ] Delete light/dark files
4. [ ] Update imports in components

---

### 2. Document Unclear Contexts

**Time**: 30 minutes

- [ ] Review `database-models-context.tsx` - Document purpose or remove
- [ ] Review `TableContext.tsx` - Should this be prop-based?
- [ ] Add JSDoc comments to all providers

---

### 3. Extract Magic Strings to Constants

**Time**: 30 minutes

**Examples**:

```typescript
// Instead of:
const db = client.db('RyS');

// Create constant:
const MONGODB_DB_NAME = 'RyS';
const db = client.db(MONGODB_DB_NAME);
```

**Files with magic strings**:

- `src/app/actions/main.ts` (collection names, field names)
- `src/app/api/Notas/route.ts`
- `src/app/api/Carpeta/route.ts`

---

## Testing Recommendations

### Add Basic Tests

```typescript
// src/__tests__/actions/notas.test.ts
import { create, update, delete } from '@/app/actions/notas';

describe('Nota Actions', () => {
  describe('create', () => {
    it('should create a new note', async () => {
      // Test implementation
    });
  });
});
```

### E2E Tests

```typescript
// e2e/carpetas.spec.ts
describe('Carpetas Feature', () => {
  it('should create and display a new carpeta', async () => {
    // Test workflow
  });
});
```

---

## Tracking Progress

Create a GitHub Project or use this template to track:

```
## Refactoring Progress

Priority 1: Database
- [ ] Audit usage
- [ ] Consolidate MongoDB/Prisma
- [ ] Fix error messages

Priority 2: Server Actions
- [ ] Create structure
- [ ] Move Nota operations
- [ ] Move Carpeta operations

Priority 3: Context
- [ ] Move feature contexts
- [ ] Consolidate forms
- [ ] Simplify root

Priority 4: Routes
- [ ] Rename to lowercase
- [ ] Update navigation
- [ ] Update links

Priority 5: Hooks
- [ ] Move domain hooks
- [ ] Update imports

Priority 6: Lib
- [ ] Reorganize structure
- [ ] Create barrel exports

Priority 7: Tests
- [ ] Add unit tests
- [ ] Add E2E tests

Total Items: 50+
Completed: [Update this]
In Progress: [Update this]
```

---

## Questions or Clarifications?

Refer back to the main `CODE_REVIEW.md` for:

- Detailed explanations of each issue
- Architecture recommendations
- Best practices being followed
- Resources and references
