import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/booking/all")
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Resource ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.id}</td>
              <td>{b.resourceId}</td>
              <td>{b.startTime}</td>
              <td>{b.endTime}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBookings;