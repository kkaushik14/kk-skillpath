import * as React from "react"
import { CourseCard } from "./CourseCard"
import type { Course, SupportedCountry } from "../Types/main"

type CoursesGridProps = {
    courses: Course[]
    country: SupportedCountry
    cardRadius: number
    cardGap: number
}

export function CoursesGrid({
    courses,
    country,
    cardRadius,
    cardGap,
}: CoursesGridProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                gap: cardGap,
                width: "100%",
                maxWidth: "100%",
            }}
        >
            {courses.map((course) => (
                <CourseCard
                    key={course.courseCode}
                    course={course}
                    country={country}
                    cardRadius={cardRadius}
                />
            ))}
        </div>
    )
}
