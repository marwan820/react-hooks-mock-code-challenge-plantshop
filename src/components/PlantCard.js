import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [inStock, setInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const { id, name, price, image } = plant;
  function handleClick() {
    setInStock((inStock) => !inStock);
  }

  function handlePriceChange(e) {
    const amount = e.target.value;
    if (amount === "" || amount === null) {
      setUpdatedPrice("");
    } else {
      setUpdatedPrice(parseFloat(e.target.value));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
    };
    fetch(`http://localhost:6001/plants/${id}`, config)
      .then((res) => res.json())
      .then((updatedPlant) => onUpdatePlant(updatedPlant));

    setUpdatedPrice(0);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" }).then(() =>
      onDeletePlant(id)
    );
  }
  console.log(updatedPrice);
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price.toFixed(0)}</p>
      {inStock ? (
        <button onClick={handleClick} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New Price..."
          value={updatedPrice}
          onChange={handlePriceChange}
        />
        <button type="submit">update price</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </li>
  );
}

export default PlantCard;
