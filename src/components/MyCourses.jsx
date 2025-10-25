import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyCourses({ userId }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  function fetchEnrolledCourses() {
    if (!userId) return;
    axios
      .get(`http://localhost:9090/api/enrollments/user/${userId}`)
      .then((res) => setEnrolledCourses(res.data))
      .catch(() => alert("Failed to fetch courses"));
  }

  useEffect(() => {
    fetchEnrolledCourses();
  }, [userId]);

  // unenroll from a course
  function unenroll(courseId) {
    if (!userId) return;
    axios
      .delete(`http://localhost:9090/api/enrollments/${courseId}/unenroll?userId=${userId}`)
      .then(() => {
        alert("You have unenrolled!");
        fetchEnrolledCourses(); // refresh  after unenroll
      })
      .catch(() => alert("Unenroll failed!"));
  }

  return (
    <div>

      <ul>
        {enrolledCourses.length === 0 ? (
          <p>No enrolled courses.</p>
        ) : (
          enrolledCourses.map((course) => (
            <li key={course.courseId}>
              {course.courseTitle}{" "}
              <button onClick={() => unenroll(course.courseId)}>Unenroll</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
