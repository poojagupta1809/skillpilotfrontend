import React, { useState } from "react";
import AllCourses from "./AllCourses";
import MyCourses from "./MyCourses";

export default function LearnerDashboard() {
  const [userId, setUserId] = useState("");

  
  function getCourses() {
    if (userId === "") {
      return <p>Please select a user to see courses.</p>;
    } else {
      return (
        <div>
          <h3>All Courses</h3>
          <AllCourses userId={userId} />

          <h3>My Enrolled Courses</h3>
          <MyCourses userId={userId} />
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Learner Dashboard</h2>

      <div>
        <label>Select User: </label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">-- Select User --</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
      </div>

      {getCourses()}
    </div>
  );
}
