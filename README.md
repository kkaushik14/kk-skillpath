
# Course Listing Platform

## Overview

A project built with Framer and React that displays a responsive course listing section with live course data and region-based pricing.

The project focuses on modular component architecture, reliable API integration, responsive layouts, and robust loading, error, and retry handling. It separates UI components, API utilities, controller logic, shared types, constants, and formatting helpers to keep the main Framer component maintainable and easy to extend.

**Live Framer Project:** https://framer.com/projects/your-project-link

## Project Structure

```text
Framer Project/
├── CoursesSection.tsx
├── API/
│   ├── apiClient.ts
│   ├── apiError.ts
│   ├── courseApi.ts
│   └── main.ts
├── Components/
│   ├── CourseCard.tsx
│   ├── CoursesGrid.tsx
│   ├── CoursesSkeleton.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── InlineWarning.tsx
│   └── main.ts
├── Constants/
│   ├── courseConstants.ts
│   └── main.ts
├── Controllers/
│   ├── useCoursesController.ts
│   └── main.ts
├── ErrorHandling/
│   ├── handleError.ts
│   └── main.ts
├── Types/
│   ├── course.ts
│   └── main.ts
├── Utils/
│   ├── formatPrice.ts
│   └── main.ts
└── main.ts
```

### Architecture

- **`CoursesSection.tsx`** — Main Framer code component responsible for composing the course listing interface.
- **Components** — Reusable UI components for course cards, grids, loading skeletons, empty states, errors, and inline warnings.
- **API** — HTTP client, API error handling, and course data fetching utilities.
- **Controllers** — Manages course data, country detection, loading states, retries, and request coordination.
- **ErrorHandling** — Centralized error processing and user-facing error messages.
- **Constants** — Shared configuration and course-related constants.
- **Types** — Shared TypeScript interfaces and types.
- **Utils** — Helper functions, including price formatting.
- **`main.ts` files** — Organize and expose module exports.

## APIs

The project integrates two APIs to retrieve course information and determine the user's region.

| API | Endpoint |
|---|---|
| Courses API | `https://syncsphere-hiv6.onrender.com/assignment/course-data` |
| Country API | `https://syncsphere-hiv6.onrender.com/assignment/country-code` |

The APIs provide the course data and country information required to display the appropriate prices.

## Region-Based Pricing

Course prices are formatted according to the detected country.

| Country | Currency | Price Conversion |
|---|---|---|
| India (`IN`) | INR (₹) | `pricePaise / 100` |
| United States (`US`) | USD ($) | `priceUsdCents / 100` |

### Pricing Behavior

- **India:** Displays prices in INR using the paise value converted to rupees.
- **United States:** Displays prices in USD using the cents value converted to dollars.
- **Unsupported initial country response:** Falls back to INR.
- **Country API failure after a valid country is detected:** Preserves the last valid currency and displays an inline warning.

Price formatting is handled separately from the UI to keep currency conversion and display logic consistent across components.

## UI States

The course listing interface supports the following states.

### Loading

Displays skeleton cards while course data is being fetched, providing visual feedback during loading.

### Success

Renders course cards with the available course information and region-appropriate pricing.

### Empty State

Displays the message `No courses available right now.` when the courses API returns an empty array.

### Course API Error

Displays an error state with a Retry action when the course request fails and no previously loaded course data is available.

### Country API Error

Keeps the course cards visible and displays an inline warning when country detection or pricing information cannot be refreshed.

Course loading and country detection are handled independently, preventing a regional API failure from unnecessarily replacing the entire course listing with an error state.

## Error Handling

The project uses centralized error handling to provide consistent behavior across API requests.

- **HTTP response validation:** `API/apiClient.ts` throws errors for unsuccessful HTTP responses, including `404` and `500` status codes.
- **Response validation:** `API/courseApi.ts` verifies that the courses response is an array before processing it.
- **Centralized error processing:** `ErrorHandling/handleError.ts` logs technical errors and returns user-friendly messages.
- **Custom API errors:** The `APIError` class provides structured error information, including HTTP status metadata.
- **Independent API handling:** Course data and country information are managed separately so that one request can fail without unnecessarily disrupting the other.

## Retry and Request Management

The project includes request management mechanisms to improve reliability and prevent outdated responses from overwriting newer data.

- A single Retry action triggers one courses request and one country request.
- Previous in-flight requests are aborted before replacement requests begin.
- Request IDs are used to identify and ignore stale responses.
- Existing course cards remain visible while retrying.
- The last valid currency is preserved while a new country request is in progress.
- The displayed currency changes only after a newer country response succeeds.
- Course and country API failures are handled independently.

These mechanisms help maintain a consistent interface during network delays, repeated requests, and intermittent API failures.

## Responsive Layout

The course grid uses a responsive CSS Grid layout compatible with Framer:

```css
repeat(auto-fit, minmax(min(260px, 100%), 1fr))
```

The layout adapts to the available container width:

- **Desktop:** Supports three course cards per row when sufficient space is available.
- **Tablet:** Adapts to two cards per row.
- **Mobile:** Displays a single card per row.

The grid automatically adjusts to different screen sizes while maintaining a minimum card width of `260px`, constrained by the available container width.

## Framer Property Controls

The component exposes configurable properties through Framer's property controls.

| Property | Description |
|---|---|
| `cardRadius` | Controls the corner radius of course cards. |
| `cardGap` | Controls the spacing between course cards. |

These controls make it possible to customize the appearance of the course listing directly within Framer without modifying the component source code.

## Technical Highlights

- Modular, multi-file TypeScript architecture.
- Reusable React components.
- Framer-compatible code component implementation.
- Live API integration for courses and country information.
- Region-based currency conversion and formatting.
- Custom API error handling with status metadata.
- API response validation.
- Abortable fetch requests.
- Stale response protection using request IDs.
- Independent course and country request handling.
- Retry behavior that preserves previously loaded data.
- Responsive CSS Grid layout.
- Configurable Framer property controls.
- Centralized constants, shared types, and utility functions.
- Organized module exports for maintainability.

## Technology Stack

- **Framework:** React
- **Language:** TypeScript
- **Platform:** Framer
- **Styling:** CSS Grid and responsive CSS
- **Networking:** Fetch API
- **Architecture:** Modular components, custom hooks, and utility modules

## AI-Assisted Development

AI tools were used to assist with code refactoring, modularization, API and error-state handling, and documentation. The resulting implementation was reviewed and adjusted to support the project's intended behavior and maintainability.
