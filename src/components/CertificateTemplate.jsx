import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CertificateTemplate({ userName, courseName }) {
  const certRef = useRef();

  const handleDownload = async () => {
    const element = certRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${userName}_Certificate.pdf`);
  };

  return (
    <div
      style={{
        textAlign: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Certificate Container */}
      <div
        ref={certRef}
        style={{
          width: "900px",
          height: "640px",
          margin: "auto",
          backgroundColor: "white",
          border: "10px solid #1976d2",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          padding: "50px",
          position: "relative",
        }}
      >
        {/* Header */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            position: "absolute",
            top: "30px",
            left: "40px",
            width: "80px",
          }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#1976d2",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          Certificate of Completion
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>This is proudly presented to</p>

        {/* Recipient */}
        <h2
          style={{
            fontSize: "2rem",
            margin: "20px 0",
            color: "#0d47a1",
            borderBottom: "2px solid #1976d2",
            display: "inline-block",
            paddingBottom: "5px",
          }}
        >
          {userName}
        </h2>

        <p style={{ fontSize: "1.1rem", color: "#333" }}>
          For successfully completing the course
        </p>
        <h3
          style={{
            fontSize: "1.5rem",
            color: "#1976d2",
            fontStyle: "italic",
            margin: "10px 0 30px 0",
          }}
        >
          “{courseName}”
        </h3>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src="./sign.png"
              alt="Signature"
              style={{ width: "120px" }}
            />
            <p style={{ marginTop: "5px", color: "#555" }}>Instructor</p>
          </div>

          <div>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div>
            <p style={{ color: "#1976d2" }}>SkillPilot Academy</p>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>www.skillpilot.com</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        style={{
          marginTop: "30px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          padding: "12px 30px",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
}