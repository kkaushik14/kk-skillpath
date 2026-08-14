# Skillpath Framer Assignment

## Overview

This Framer code component renders a responsive course listing section using live course data and region-based pricing. The implementation is split into components, controller logic, API utilities, error handling, shared types, constants, and formatting helpers so the main Framer component stays small and easy to review.

**Live Framer link:** `https://framer.com/projects/your-project-link`

## Source Structure

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

`CoursesSection.tsx` is the main Framer code component.

## APIs Used

- Courses API: `https://syncsphere-hiv6.onrender.com/assignment/course-data`
- Country API: `https://syncsphere-hiv6.onrender.com/assignment/country-code`

## Pricing

- India (`IN`): displays INR using `pricePaise / 100`
- United States (`US`): displays USD using `priceUsdCents / 100`
- Unsupported initial country response: falls back to INR
- Country request failure after a valid country is already available: keeps the previous currency stable and shows a warning

## UI States

- Loading: skeleton cards are shown while the courses API is loading
- Success: course cards render with formatted pricing
- Empty: shows a “No courses available right now.” message when the courses API returns an empty array
- Course API error: shows the main Retry state only when courses fail and no existing course data is available
- Country API error: keeps course cards visible and shows an inline region/pricing warning

## Error Handling

- `API/apiClient.ts` throws for non-OK HTTP responses such as `404` or `500`
- `API/courseApi.ts` validates that the courses response is an array
- `ErrorHandling/handleError.ts` logs the technical error and returns a reviewer-friendly UI message
- Course and country API errors are handled independently so a country failure does not replace the course section with the Retry state

## Retry Behavior

- One Retry click triggers one courses request and one country request
- Previous in-flight requests are aborted before starting a new request
- Stale responses are ignored using request IDs
- Existing course cards and the last valid currency are not cleared while retrying
- Displayed currency remains stable until a newer successful country response arrives

## Responsive Layout

The grid uses the Framer-compatible structure:

```ts
repeat(auto-fit, minmax(min(260px, 100%), 1fr))
```

This supports the assignment layout goal:

- Desktop: 3 cards per row
- Tablet: 2 cards per row
- Mobile: 1 card per row

## Framer Property Controls

- `cardRadius`: controls course card corner radius
- `cardGap`: controls spacing between cards

## Bonus Features

- Modular folder-based structure with `main.ts` export files
- Custom `APIError` class with status metadata
- Abortable fetch requests
- Stale request protection
- Independent fallback handling for region/pricing errors
- GitHub-friendly folder casing matching the Framer sidebar

## AI Usage Disclosure

AI assistance was used to refactor the original component into a cleaner multi-file structure, improve API/error state handling, and prepare this README. The implementation was reviewed and adjusted against the assignment requirements.
