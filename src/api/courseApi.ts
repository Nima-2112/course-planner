//-------Constants-------

const API_URL = "http://localhost:3001";

//-------Get Courses-------

export async function getCourses() {
  const response = await fetch(`${API_URL}/courses`);

  if (!response.ok) {
    throw new Error(`Failed to fetch courses. Status: ${response.status}`);
  }

  return response.json();
}
