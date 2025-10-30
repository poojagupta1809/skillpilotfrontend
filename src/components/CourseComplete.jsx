import CertificateTemplate from "./CertificateTemplate";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseComplete() {
  const userName = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return; // ✅ Prevent API call if no ID

    // Fetch course details
    axios
      .get(`http://localhost:8088/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((err) => {
        console.log("Error fetching course:", err);
        navigate("/admin");
      });

    // Mark course as completed
    axios
      .patch(
        `http://localhost:8088/api/enrollments/courses/${courseId}/completeEnrollment/${userId}`
      )
      .then(() => {
        alert("You have completed the course!");
      })
      .catch(() => alert("Course completion failed!"));
  }, [courseId, userId, navigate]);

  // ✅ Safely render only after data is loaded
  if (!course) {
    return <h3 style={{ textAlign: "center" }}>Loading certificate...</h3>;
  }

  return (
    <CertificateTemplate
      userName={userName || "Learner"}
      courseName={course.topic || "Udemy Course"}
    />
  );
}
