import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardContainer = () => {
  const navigate = useNavigate();

  const analyticsLinks = [
    { label: "📘 Course Completion Statistics", path: "/admin/dashboard/completion" },
    { label: "📈 Course Enrollment Analytics", path: "/admin/dashboard/enrollments" },
    // Later we can add more charts here
    // { label: "Enrollment Trends", path: "/admin/dashboard/trends" },
    // { label: "Topic Distribution", path: "/admin/dashboard/topics" },
  ];

  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "60%",
        }}
      >
        {analyticsLinks.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              padding: "15px",
              fontSize: "18px",
              cursor: "pointer",
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardContainer;
