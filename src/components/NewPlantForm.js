import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormdata] = useState({
    name: "",
    price: 0,
    image: "",
  });
  console.log(formData);

  function handleChange(e) {
    if (e.target.name === "price") {
      const amount = e.target.value;
      if (amount === "" || amount === null) {
        setFormdata({ ...formData, [e.target.name]: "" });
      } else {
        setFormdata({
          ...formData,
          [e.target.name]: parseFloat(e.target.value),
        });
      }
    } else {
      setFormdata({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:6001/plants", config)
      .then((res) => res.json())
      .then((plant) => onAddPlant(plant));

    setFormdata({ name: "", price: 0, image: "" ,});
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Plant name"
        />
        <input
          onChange={handleChange}
          value={formData.image}
          type="text"
          name="image"
          placeholder="Image URL"
        />
        <input
          onChange={handleChange}
          value={formData.price}
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
