import * as React from "react"
import type { Course, SupportedCountry } from "../Types/main"
import { formatPrice } from "../Utils/main"

type CourseCardProps = {
    course: Course
    country: SupportedCountry
    cardRadius: number
}

export function CourseCard({
    course,
    country,
    cardRadius,
}: CourseCardProps) {
    return (
        <div
            style={{
                padding: 24,
                borderRadius: cardRadius,
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 220,
                flex: 1,
            }}
        >
            <h3
                style={{
                    margin: 0,
                    fontSize: 20,
                    lineHeight: 1.3,
                    fontWeight: 600,
                }}
            >
                {course.courseName}
            </h3>

            <span
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#888888",
                }}
            >
                {course.shortCourse}
            </span>

            <p
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#666666",
                }}
            >
                {course.description}
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    marginTop: "auto",
                }}
            >
                <strong
                    style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#111111",
                    }}
                >
                    {formatPrice(course, country)}
                </strong>

                <span
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#666666",
                    }}
                >
                    {course.mainCategory}
                </span>

                <span
                    style={{
                        fontSize: 12,
                        color: "#888888",
                    }}
                >
                    {course.courseType}
                </span>

                {course.refundable && (
                    <span
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#166534",
                            background: "#DCFCE7",
                            padding: "4px 8px",
                            borderRadius: 999,
                            alignSelf: "flex-start",
                        }}
                    >
                        Refundable
                    </span>
                )}
            </div>
        </div>
    )
}
