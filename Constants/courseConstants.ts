import type { SupportedCountry } from "../Types/main"

export const COURSE_API =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

export const COUNTRY_API =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export const FALLBACK_COUNTRY: SupportedCountry = "IN"

export const ERROR_MESSAGES = {
    courses: "Unable to load courses. Please try again.",
    country: "Region unavailable - showing INR pricing.",
    countryPrevious: "Region unavailable - keeping previous pricing.",
    invalidCountry: "Received an unsupported country code.",
    invalidCourses: "Received an invalid courses response.",
    fetchCourses: "Failed to fetch courses.",
    fetchCountry: "Failed to fetch country.",
}
