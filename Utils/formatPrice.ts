import type { Course, SupportedCountry } from "../Types/main"

export function formatPrice(course: Course, country: SupportedCountry) {
    if (country === "IN") {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(course.pricePaise / 100)
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(course.priceUsdCents / 100)
}
