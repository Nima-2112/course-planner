//-------import-------

import { useMemo } from "react";

import type { Course } from "../types";

//-------Types-------

type UseCourseSearchResult = {
  filteredCourses: Course[];
  departments: string[];
};

//-------Hook-------

function useCourseSearch(
  courses: Course[],
  searchTerm: string,
  department: string,
): UseCourseSearchResult {
  const departments = useMemo(() => {
    const uniqueDepartments = new Set(
      courses.map((course) => course.department),
    );

    return Array.from(uniqueDepartments).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        course.title.toLowerCase().includes(normalizedSearch) ||
        course.code.toLowerCase().includes(normalizedSearch);

      const matchesDepartment =
        department === "All" || course.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [courses, searchTerm, department]);

  return {
    filteredCourses,
    departments,
  };
}

//-------Export-------

export default useCourseSearch;
