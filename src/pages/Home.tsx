import React, { useState } from "react";
import { ButtonIcon, Navbar, AutoCompleteComponent } from "../components";
import { Button, Modal, Space } from 'antd';
import findExpireDates from "../lookup"
import expDates from "../expDates.json";
import { formatDistanceToNow } from "date-fns";

function Home() {
  const autocompleteValues = Object.keys(expDates).map((name) => {
    return { value: name };
  });

  const [savedFoods, setSavedFoods] = React.useState<any[]>([]);
  const handleSelect = (value: string) => {
    const d = findExpireDates(value);
    if (!d) {
      prompt("Sorry, we don't have information on that food. Please try again.");
      return;
    }
    console.log(d)
    const validOpts = []
    if (d.frozen) validOpts.push("frozen");
    if (d.refrigerated) validOpts.push("refrigerated");
    if (d.unrefrigerated) validOpts.push("unrefrigerated");
    const opt: keyof typeof d = (prompt("Where is your food stored? " + validOpts.join(", ")) || "unrefrigerated") as keyof typeof d;
    if (!validOpts.includes(opt)) {
      prompt("Invalid option. Please try again.");
      return;
    }
    const date = d[opt];
    setSavedFoods([...savedFoods, { name: value, date }]);
  }

    return (
      <main className="Homepage">
        <Navbar></Navbar>
        <br></br>
        <h1>shelfsaver</h1>
        <AutoCompleteComponent options={autocompleteValues} handleSelect={handleSelect}></AutoCompleteComponent>
        <h1>Saved Foods</h1>
        <ul>
          {savedFoods
          .slice()
          .sort((a, b) => a.date - b.date)
          .map(({name, date}) => (
            <li key={name}>{name}: {
              date === "inf" ? "♾" : formatDistanceToNow(date, { addSuffix: true })
            }</li>
          ))}
        </ul>
        <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
      </main>
    );
  }

  export default Home