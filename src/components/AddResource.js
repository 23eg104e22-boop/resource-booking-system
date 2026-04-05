import React, { useState } from "react";
import axios from "axios";

function AddResource() {

  const [resource, setResource] = useState({
    name: "",
    location: "",
    capacity: ""
  });

  const handleChange = (e) => {
    setResource({
      ...resource,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/resource/add", resource);
      alert("Resource Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding resource");
    }
  };

  return (
    <div style={{marginTop:"40px"}}>
      <h2>Add Resource</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Resource Name"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">Add Resource</button>

      </form>
    </div>
  );
}

export default AddResource;