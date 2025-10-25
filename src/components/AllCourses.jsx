import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllCourses({ userId }) {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // fetch all courses
  function fetchCourses() {
    axios
      .get("http://localhost:9090/api/courses/view")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to fetch courses"));
  }

  // fetch enrolled courses for the user
  function fetchEnrolled() {
    if (!userId) return;
    axios
      .get(`http://localhost:9090/api/enrollments/user/${userId}`)
      .then((res) => setEnrolledCourses(res.data.map(c => c.courseId)))
      .catch(() => alert("Failed to fetch enrolled courses"));
  }

  // fetch data when loads or user changes
  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
  }, [userId]);

  function enroll(courseId) {
    if (!userId) return;
    axios
      .post(`http://localhost:9090/api/enrollments/${courseId}/enroll?userId=${userId}`)
      .then(() => {
        alert("You have enrolled!");
        fetchEnrolled(); // update enrolled courses
      })
      .catch(() => alert("Enrollment failed!"));
  }

  return (
    <div>
      <ul>
        {courses.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.courseId);
          return (
            <li key={course.courseId}>
              {course.name} - {course.topic}{" "}
              <button
                onClick={() => enroll(course.courseId)}
                disabled={isEnrolled}
              >
                {isEnrolled ? "Enrolled" : "Enroll"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
