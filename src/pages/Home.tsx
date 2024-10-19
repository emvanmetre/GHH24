import React from "react";
import { ButtonIcon, Navbar, AutoCompleteComponent } from "../components";
import expDates from "../expDates.json";

function Home() {
  const autocompleteValues = Object.keys(expDates).map((name) => {
    return { value: name };
  });

    return (
      <div className="Homepage">
        <Navbar></Navbar>
        <AutoCompleteComponent options={autocompleteValues}></AutoCompleteComponent>
        <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
      </div>
    );
  }

  export default Home