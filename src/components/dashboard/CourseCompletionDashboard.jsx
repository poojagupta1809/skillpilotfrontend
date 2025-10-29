import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CourseCompletionDashboard = () => {
  const [completionStats, setCompletionStats] = useState([]);

  // ✅ Update with your backend API base URL
  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetchCompletionStats();
  }, []);

  const fetchCompletionStats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/enrollments`);
      const enrollments = response.data;

      // Group by course name
      const stats = {};
      enrollments.forEach((e) => {
        const courseName = e.courseTopic || "Unknown";
        if (!stats[courseName]) stats[courseName] = { completed: 0, inProgress: 0 };

        if (e.status === "COMPLETED") stats[courseName].completed++;
        else stats[courseName].inProgress++;
      });

      // Convert object → array for chart
      const formattedData = Object.keys(stats).map((name) => ({
        name,
        completed: stats[name].completed,
        inProgress: stats[name].inProgress,
      }));

      setCompletionStats(formattedData);
    } catch (err) {
      console.error("Error fetching completion stats", err);
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
      <h2>📘 Course Completion Statistics</h2>
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
          <BarChart data={completionStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#4caf50" />
            <Bar dataKey="inProgress" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseCompletionDashboard;
