import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { useState, useEffect } from "react";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plants) => setPlants(plants));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  const plantFilter = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("Filter", plantFilter);

  function handleUpdatePlant(updatedPlant) {
    const upDatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(upDatedPlants)
  }

  function handleDeletePlant(id){
const filterPlants = plants.filter((plant) => plant.id !== id)
  }
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList onDeletePlant={handleDeletePlant} plants={plantFilter} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
