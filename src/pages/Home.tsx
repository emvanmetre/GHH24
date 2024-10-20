import React, { useState } from "react";
import { ButtonIcon, Navbar, AutoCompleteComponent } from "../components";
import { Button, Modal, Space } from 'antd';
import findExpireDates from "../lookup"
import expDates from "../expDates.json";
import { formatDistanceToNow } from "date-fns";

function Home() {
  const eDates: any = expDates;
  const autocompleteValues = Object.keys(expDates).map((name) => {
    return { value: name };
  });

  const [savedFoods, setSavedFoods] = React.useState<any[]>([]);
  const handleSelect = (value: string) => {
    if (savedFoods.find((f) => f.name === value)) {
      alert("You have already saved this food.");
      return;
    }
    const d = findExpireDates(value);
    if (!d) {
      prompt("Sorry, we don't have information on that food. Please try again.");
      return;
    }
    console.log(d)
    const validOpts: Array<keyof typeof d> = []
    if (d.frozen) validOpts.push("frozen");
    if (d.refrigerated) validOpts.push("refrigerated");
    if (d.unrefrigerated) validOpts.push("unrefrigerated");
    if (validOpts.length === 1) {
      setSavedFoods([...savedFoods, { name: value, date: d[validOpts[0]] }]);
      return;
    }
    const opt: keyof typeof d = (prompt("Where is your food stored? " + validOpts.join(", ")) || "unrefrigerated") as keyof typeof d;
    if (!validOpts.includes(opt)) {
      alert("Invalid option. Please try again.");
      return;
    }
    const date = d[opt];
    setSavedFoods([...savedFoods, { name: value, date }]);
  }

  return (
    <main className="Homepage">
      {/* <Navbar></Navbar> */}
      {/* <br></br> */}
      <h1>shelfsmart</h1>
      <AutoCompleteComponent options={autocompleteValues} handleSelect={handleSelect}></AutoCompleteComponent>
      <h1>saved foods</h1>
      {/* <ul> */}
        {savedFoods
          .slice()
          .sort((a, b) => {
            if (a.date === "inf") return 1;
            if (b.date === "inf") return -1;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
          .map(({ name, date }) => (
            <div key={name}>
              <img src={eDates[name].image_url} alt={name} width={100} /><br></br>
              {name}: 
              {" "}{
                date === "inf" ? "♾" : (date < new Date() ? "Expired " :"") + formatDistanceToNow(date, { addSuffix: true })
              }</div>
          ))}
      {/* </ul> */}
      <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
    </main>
  );
}

export default Home