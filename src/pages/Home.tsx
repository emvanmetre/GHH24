import React from "react";
import { ButtonIcon, Navbar, AutoCompleteComponent } from "../components";
import expDates from "../expDates.json";

function Home() {
  const autocompleteValues = Object.keys(expDates).map((name) => {
    return { value: name };
  });

  const [savedFoods, setSavedFoods] = React.useState<string[]>([]);
  const handleSelect = (value: string) => {
    setSavedFoods([...savedFoods, value]);
  }

    return (
      <main className="Homepage">
        <Navbar></Navbar>
        <br></br>
        <h1>shelfsaver</h1>
        <AutoCompleteComponent options={autocompleteValues} handleSelect={handleSelect}></AutoCompleteComponent>
        <h1>Saved Foods</h1>
        <ul>
          {savedFoods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
        <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
      </main>
    );
  }

  export default Home