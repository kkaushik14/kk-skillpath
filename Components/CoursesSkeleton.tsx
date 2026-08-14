import * as React from "react"

type CoursesSkeletonProps = {
    cardRadius: number
    cardGap: number
}

export function CoursesSkeleton({
    cardRadius,
    cardGap,
}: CoursesSkeletonProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                gap: cardGap,
                width: "100%",
                padding: "40px 20px",
                boxSizing: "border-box",
            }}
        >
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    style={{
                        height: 220,
                        borderRadius: cardRadius,
                        background: "#EEEEEE",
                    }}
                />
            ))}
        </div>
    )
}
