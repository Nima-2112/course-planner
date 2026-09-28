//-------import-------

import type { Course, CreateCourseInput } from "../types";

//-------Constants-------

const COURSES_ENDPOINT = "/courses";

//-------Get Courses-------

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(COURSES_ENDPOINT);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch courses. Server returned ${response.status}.`,
    );
  }

  const data = (await response.json()) as Course[];

  if (!Array.isArray(data)) {
    throw new Error("Invalid course data received from the server.");
  }

  return data;
}

//-------Create Course-------

export async function createCourse(course: CreateCourseInput): Promise<Course> {
  const response = await fetch(COURSES_ENDPOINT, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(course),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create course. Server returned ${response.status}.`,
    );
  }

  return (await response.json()) as Course;
}
