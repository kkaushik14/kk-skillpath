# Framer Project

Use `CoursesSection.tsx` as the main Framer code component.

## Folder Structure

```text
Framer Project/
  CoursesSection.tsx
  API/
    apiClient.ts
    apiError.ts
    courseApi.ts
    main.ts
  Components/
    CourseCard.tsx
    CoursesGrid.tsx
    CoursesSkeleton.tsx
    EmptyState.tsx
    ErrorState.tsx
    InlineWarning.tsx
    main.ts
  Constants/
    courseConstants.ts
    main.ts
  Controllers/
    useCoursesController.ts
    main.ts
  ErrorHandling/
    handleError.ts
    main.ts
  Types/
    course.ts
    main.ts
  Utils/
    formatPrice.ts
    main.ts
  main.ts
```

## How To Use In Framer

1. Create a new code component in Framer named `CoursesSection`.
2. Put `CoursesSection.tsx` as the main file.
3. Add the folders from this project next to that main file.
4. Attach the `CoursesSection` component to your Framer layer.

## Notes

- `API/apiError.ts` contains API-specific error handling.
- `ErrorHandling/handleError.ts` logs the actual error and returns a custom user-facing message.
- `Controllers/useCoursesController.ts` controls loading, API calls, fallback country logic, and error state.
- Only the courses API controls the full skeleton loading state. The country API runs in parallel and never blocks course rendering; INR is used until country detection succeeds.
- The Retry button refetches both APIs without reloading the page. Course and country errors remain independent.
- `Components/` contains only UI components.
- Each folder has a `main.ts` file that works as the single point of import/export for that folder.
- The root `main.ts` re-exports all folder-level `main.ts` files.
