export type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

export type SupportedCountry = "IN" | "US"

export type CountryResponse = {
    country_code?: string
}

export type AppError = {
    message: string
    error: unknown
}

