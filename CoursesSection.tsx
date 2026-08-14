import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    CoursesGrid,
    CoursesSkeleton,
    EmptyState,
    ErrorState,
    InlineWarning,
} from "./Components/main"
import { useCoursesController } from "./Controllers/main"

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

type CoursesSectionProps = {
    cardRadius?: number
    cardGap?: number
}

export default function CoursesSection({
    cardRadius = 16,
    cardGap = 24,
}: CoursesSectionProps) {
    const {
        courses,
        country,
        isLoading,
        coursesError,
        countryError,
        retry,
    } = useCoursesController()

    if (isLoading) {
        return <CoursesSkeleton cardRadius={cardRadius} cardGap={cardGap} />
    }

    if (coursesError && courses.length === 0) {
        return (
            <ErrorState
                message={coursesError.message}
                onRetry={retry}
            />
        )
    }

    if (courses.length === 0) {
        return <EmptyState />
    }

    return (
        <div
            style={{
                width: "100%",
                minHeight: 0,
                padding: "40px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 24,
            }}
        >
            {countryError && <InlineWarning message={countryError.message} />}

            <CoursesGrid
                courses={courses}
                country={country}
                cardRadius={cardRadius}
                cardGap={cardGap}
            />
        </div>
    )
}

addPropertyControls(CoursesSection, {
    cardRadius: {
        type: ControlType.Number,
        title: "Card Radius",
        min: 0,
        max: 32,
        step: 1,
        defaultValue: 16,
    },
    cardGap: {
        type: ControlType.Number,
        title: "Card Gap",
        min: 8,
        max: 40,
        step: 1,
        defaultValue: 24,
    },
})
