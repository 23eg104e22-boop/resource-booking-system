import React, { useState } from "react";
import axios from "axios";

function BookingForm() {

  const [booking, setBooking] = useState({
    resourceId: "",
    startTime: "",
    endTime: "",
    status: ""
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     axios.post("http://localhost:8081/booking/create", booking);
      alert("Booking Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating booking");
    }
  };

  return (
    <div style={{marginTop:"40px"}}>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="resourceId"
          placeholder="Resource ID"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="datetime-local"
          name="startTime"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">Create Booking</button>

      </form>
    </div>
  );
}

export default BookingForm;