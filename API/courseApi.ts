import {
    COUNTRY_API,
    COURSE_API,
    ERROR_MESSAGES,
} from "../Constants/main"
import type { CountryResponse, Course, SupportedCountry } from "../Types/main"
import { APIError } from "./apiError"
import { fetchJson } from "./apiClient"

let coursesRequest: Promise<Course[]> | null = null
let countryRequest: Promise<SupportedCountry> | null = null

type FetchOptions = {
    forceRefresh?: boolean
    signal?: AbortSignal
}

export async function fetchCourses({
    forceRefresh = false,
    signal,
}: FetchOptions = {}): Promise<Course[]> {
    if (forceRefresh || signal) {
        coursesRequest = null
    }

    if (!coursesRequest) {
        let request: Promise<Course[]>

        request = fetchJson<unknown>(
            COURSE_API,
            ERROR_MESSAGES.fetchCourses,
            signal
        )
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new APIError(ERROR_MESSAGES.invalidCourses)
                }

                return data as Course[]
            })
            .catch((error) => {
                if (coursesRequest === request) {
                    coursesRequest = null
                }

                throw error
            })

        coursesRequest = request
    }

    return coursesRequest
}

export async function fetchCountry({
    forceRefresh = false,
    signal,
}: FetchOptions = {}): Promise<SupportedCountry> {
    if (forceRefresh || signal) {
        countryRequest = null
    }

    if (!countryRequest) {
        let request: Promise<SupportedCountry>

        request = fetchJson<CountryResponse>(
            COUNTRY_API,
            ERROR_MESSAGES.fetchCountry,
            signal
        )
            .then((data) => {
                if (data.country_code === "IN" || data.country_code === "US") {
                    return data.country_code
                }

                throw new APIError(ERROR_MESSAGES.invalidCountry)
            })
            .catch((error) => {
                if (countryRequest === request) {
                    countryRequest = null
                }

                throw error
            })

        countryRequest = request
    }

    return countryRequest
}
