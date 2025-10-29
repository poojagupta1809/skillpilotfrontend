import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CourseEnrollmentAnalytics = () => {
  const [courseStats, setCourseStats] = useState([]);

  const BASE_URL = "http://localhost:8088/api/enrollments";

  useEffect(() => {
    fetchCoursePopularity();
  }, []);

  const fetchCoursePopularity = async () => {
    try {
      const enrollmentsRes = await axios.get(`${BASE_URL}/enrollments`);
      const enrollments = enrollmentsRes.data;

      // Group enrollments by course name
      const stats = {};
      enrollments.forEach((e) => {
        const courseName = e.courseTopic || "Unknown";
        stats[courseName] = (stats[courseName] || 0) + 1;
      });

      const formatted = Object.keys(stats).map((name) => ({
        name,
        enrollments: stats[name],
      }));

      setCourseStats(formatted);
    } catch (err) {
      console.error("Error fetching course enrollments", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "40px",
      }}
    >
      <h2>📊 Course Enrollment Analytics</h2>

      <div
        style={{
          width: "80%",
          height: 400,
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="enrollments" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseEnrollmentAnalytics;
