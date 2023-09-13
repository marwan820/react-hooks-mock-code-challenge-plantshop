import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants,onUpdatePlant,onDeletePlant}) {
  const plantList = plants.map((plant) => (
    <PlantCard onDeletePlant={onDeletePlant} onUpdatePlant={onUpdatePlant} key={plant.id} plant={plant} />
  ));

  return <ul className="cards">{plantList}</ul>;
}

export default PlantList;
