import * as React from "react"
import { APIError, fetchCountry, fetchCourses } from "../API/main"
import {
    ERROR_MESSAGES,
    FALLBACK_COUNTRY,
} from "../Constants/main"
import { handleError } from "../ErrorHandling/main"
import type { AppError, Course, SupportedCountry } from "../Types/main"

type CoursesControllerState = {
    courses: Course[]
    country: SupportedCountry
    isLoading: boolean
    countryLoading: boolean
    coursesError: AppError | null
    countryError: AppError | null
    retry: () => void
}

export function useCoursesController(): CoursesControllerState {
    const [courses, setCourses] = React.useState<Course[]>([])
    const [country, setCountry] =
        React.useState<SupportedCountry>(FALLBACK_COUNTRY)
    const [coursesLoading, setCoursesLoading] = React.useState(true)
    const [countryLoading, setCountryLoading] = React.useState(true)
    const [coursesError, setCoursesError] = React.useState<AppError | null>(
        null
    )
    const [countryError, setCountryError] = React.useState<AppError | null>(
        null
    )
    const hasLoadedCourses = React.useRef(false)
    const hasLoadedValidCountry = React.useRef(false)
    const coursesRequestId = React.useRef(0)
    const countryRequestId = React.useRef(0)
    const isMounted = React.useRef(false)
    const coursesAbortController = React.useRef<AbortController | null>(null)
    const countryAbortController = React.useRef<AbortController | null>(null)

    function isAbortError(error: unknown) {
        return error instanceof DOMException && error.name === "AbortError"
    }

    function isUnsupportedCountryError(error: unknown) {
        return (
            error instanceof APIError &&
            error.message === ERROR_MESSAGES.invalidCountry
        )
    }

    const loadCourses = React.useCallback(async (forceRefresh = false) => {
        const requestId = coursesRequestId.current + 1
        coursesRequestId.current = requestId
        coursesAbortController.current?.abort()
        coursesAbortController.current = new AbortController()

        setCoursesLoading(true)
        setCoursesError(null)

        try {
            const courseData = await fetchCourses({
                forceRefresh,
                signal: coursesAbortController.current.signal,
            })

            if (!isMounted.current || requestId !== coursesRequestId.current) {
                return
            }

            hasLoadedCourses.current = true
            setCourses(courseData)
            setCoursesError(null)
        } catch (error) {
            if (!isMounted.current || requestId !== coursesRequestId.current) {
                return
            }

            if (isAbortError(error)) {
                return
            }

            const appError = handleError(ERROR_MESSAGES.courses, error)

            if (!hasLoadedCourses.current) {
                setCoursesError(appError)
            }
        } finally {
            if (isMounted.current && requestId === coursesRequestId.current) {
                setCoursesLoading(false)
            }
        }
    }, [])

    const loadCountry = React.useCallback(async (forceRefresh = false) => {
        const requestId = countryRequestId.current + 1
        countryRequestId.current = requestId
        countryAbortController.current?.abort()
        countryAbortController.current = new AbortController()

        setCountryLoading(true)

        try {
            const countryCode = await fetchCountry({
                forceRefresh,
                signal: countryAbortController.current.signal,
            })

            if (!isMounted.current || requestId !== countryRequestId.current) {
                return
            }

            hasLoadedValidCountry.current = true
            setCountry(countryCode)
            setCountryError(null)
        } catch (error) {
            if (!isMounted.current || requestId !== countryRequestId.current) {
                return
            }

            if (isAbortError(error)) {
                return
            }

            const hasPreviousValidCountry = hasLoadedValidCountry.current
            const message = hasPreviousValidCountry
                ? ERROR_MESSAGES.countryPrevious
                : ERROR_MESSAGES.country

            if (isUnsupportedCountryError(error) && !hasPreviousValidCountry) {
                setCountry(FALLBACK_COUNTRY)
            }

            setCountryError(handleError(message, error))
        } finally {
            if (isMounted.current && requestId === countryRequestId.current) {
                setCountryLoading(false)
            }
        }
    }, [])

    React.useEffect(() => {
        isMounted.current = true
        loadCourses()
        loadCountry()

        return () => {
            isMounted.current = false
            coursesAbortController.current?.abort()
            countryAbortController.current?.abort()
        }
    }, [loadCourses, loadCountry])

    const retry = React.useCallback(() => {
        loadCourses(true)
        loadCountry(true)
    }, [loadCourses, loadCountry])

    return {
        courses,
        country,
        isLoading: coursesLoading && courses.length === 0,
        countryLoading,
        coursesError,
        countryError,
        retry,
    }
}
