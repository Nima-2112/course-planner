//-------import-------

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { createCourse, getCourses } from "../api/courseApi";

import type { Course, CreateCourseInput } from "../types";

import { useAuth } from "./AuthContext";

//-------Types-------

type State = {
  courses: Course[];
  planner: number[];
  loading: boolean;
  error: string;
  addingCourse: boolean;
  addCourseError: string;
};

type Action =
  | {
      type: "FETCH_START";
    }
  | {
      type: "FETCH_SUCCESS";
      payload: Course[];
    }
  | {
      type: "FETCH_ERROR";
      payload: string;
    }
  | {
      type: "ADD_PLANNER_COURSE";
      payload: number;
    }
  | {
      type: "REMOVE_PLANNER_COURSE";
      payload: number;
    }
  | {
      type: "LOAD_PLANNER";
      payload: number[];
    }
  | {
      type: "ADD_COURSE_START";
    }
  | {
      type: "ADD_COURSE_SUCCESS";
      payload: Course;
    }
  | {
      type: "ADD_COURSE_ERROR";
      payload: string;
    };

type PlannerContextValue = {
  courses: Course[];
  planner: number[];
  selectedCourses: Course[];
  totalCredits: number;

  loading: boolean;
  error: string;

  addingCourse: boolean;
  addCourseError: string;

  addCourse: (id: number) => void;
  removeCourse: (id: number) => void;

  createNewCourse: (course: CreateCourseInput) => Promise<Course | null>;

  isCourseInPlanner: (id: number) => boolean;

  retryFetchCourses: () => Promise<void>;
};

//-------Constants-------

const GUEST_PLANNER_KEY = "coursePlannerSelectedCourses";

//-------Initial State-------

const initialState: State = {
  courses: [],
  planner: [],
  loading: true,
  error: "",
  addingCourse: false,
  addCourseError: "",
};

//-------Reducer-------

function plannerReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: "",
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOAD_PLANNER":
      return {
        ...state,
        planner: action.payload,
      };

    case "ADD_PLANNER_COURSE":
      if (state.planner.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        planner: [...state.planner, action.payload],
      };

    case "REMOVE_PLANNER_COURSE":
      return {
        ...state,
        planner: state.planner.filter(
          (courseId) => courseId !== action.payload,
        ),
      };

    case "ADD_COURSE_START":
      return {
        ...state,
        addingCourse: true,
        addCourseError: "",
      };

    case "ADD_COURSE_SUCCESS":
      return {
        ...state,
        courses: [...state.courses, action.payload],
        addingCourse: false,
        addCourseError: "",
      };

    case "ADD_COURSE_ERROR":
      return {
        ...state,
        addingCourse: false,
        addCourseError: action.payload,
      };

    default:
      return state;
  }
}

//-------Context-------

const PlannerContext = createContext<PlannerContextValue | undefined>(
  undefined,
);

//-------Provider-------

function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  const { user } = useAuth();

  //-------Storage Key-------

  const storageKey = user
    ? `${GUEST_PLANNER_KEY}:${user.id}`
    : GUEST_PLANNER_KEY;

  //-------Fetch Catalog-------

  const fetchCourses = useCallback(async () => {
    dispatch({
      type: "FETCH_START",
    });

    try {
      const courses = await getCourses();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: courses,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to load courses.",
      });
    }
  }, []);

  //-------Initial Catalog Fetch-------

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  //-------Load Planner From Local Storage-------

  useEffect(() => {
    try {
      const savedPlanner = localStorage.getItem(storageKey);

      if (!savedPlanner) {
        dispatch({
          type: "LOAD_PLANNER",
          payload: [],
        });

        return;
      }

      const parsedPlanner = JSON.parse(savedPlanner);

      if (!Array.isArray(parsedPlanner)) {
        dispatch({
          type: "LOAD_PLANNER",
          payload: [],
        });

        return;
      }

      const validPlanner = parsedPlanner
        .map(Number)
        .filter((id) => Number.isFinite(id));

      dispatch({
        type: "LOAD_PLANNER",
        payload: validPlanner,
      });
    } catch (error) {
      console.error("Failed to load planner from localStorage.", error);

      dispatch({
        type: "LOAD_PLANNER",
        payload: [],
      });
    }
  }, [storageKey]);

  //-------Save Planner To Local Storage-------

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state.planner));
    } catch (error) {
      console.error("Failed to save planner to localStorage.", error);
    }
  }, [state.planner, storageKey]);

  //-------Add Planner Course-------

  const addCourse = useCallback((id: number) => {
    dispatch({
      type: "ADD_PLANNER_COURSE",
      payload: id,
    });
  }, []);

  //-------Remove Planner Course-------

  const removeCourse = useCallback((id: number) => {
    dispatch({
      type: "REMOVE_PLANNER_COURSE",
      payload: id,
    });
  }, []);

  //-------Create Course-------

  const createNewCourse = useCallback(
    async (course: CreateCourseInput): Promise<Course | null> => {
      dispatch({
        type: "ADD_COURSE_START",
      });

      try {
        const newCourse = await createCourse(course);

        dispatch({
          type: "ADD_COURSE_SUCCESS",
          payload: newCourse,
        });

        return newCourse;
      } catch (error) {
        dispatch({
          type: "ADD_COURSE_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to create course.",
        });

        return null;
      }
    },
    [],
  );

  //-------Course Check-------

  const isCourseInPlanner = useCallback(
    (id: number) => state.planner.includes(id),
    [state.planner],
  );

  //-------Selected Courses-------

  const selectedCourses = useMemo(
    () => state.courses.filter((course) => state.planner.includes(course.id)),
    [state.courses, state.planner],
  );

  //-------Total Credits-------

  const totalCredits = useMemo(
    () => selectedCourses.reduce((total, course) => total + course.credits, 0),
    [selectedCourses],
  );

  //-------Context Value-------

  const contextValue = useMemo<PlannerContextValue>(
    () => ({
      courses: state.courses,
      planner: state.planner,
      selectedCourses,
      totalCredits,

      loading: state.loading,
      error: state.error,

      addingCourse: state.addingCourse,
      addCourseError: state.addCourseError,

      addCourse,
      removeCourse,

      createNewCourse,

      isCourseInPlanner,

      retryFetchCourses: fetchCourses,
    }),
    [
      state.courses,
      state.planner,
      selectedCourses,
      totalCredits,
      state.loading,
      state.error,
      state.addingCourse,
      state.addCourseError,
      addCourse,
      removeCourse,
      createNewCourse,
      isCourseInPlanner,
      fetchCourses,
    ],
  );

  return (
    <PlannerContext.Provider value={contextValue}>
      {children}
    </PlannerContext.Provider>
  );
}

//-------Custom Context Hook-------

export function usePlanner() {
  const context = useContext(PlannerContext);

  if (!context) {
    throw new Error("usePlanner must be used inside PlannerProvider.");
  }

  return context;
}

//-------Export-------

export default PlannerProvider;
