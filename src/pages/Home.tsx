import React, { useEffect } from "react";
import { ButtonIcon, AutoCompleteComponent } from "../components";
import findExpireDates from "../lookup"
import expDates from "../expDates.json";
import { formatDistanceToNow } from "date-fns";

function Home() {
  const eDates: any = expDates;
  const autocompleteValues = Object.keys(expDates).map((name) => {
    return { value: name };
  });

  const [savedFoods, setSavedFoods] = React.useState<any[]>([]);
  // Load savedFoods from local storage when the component mounts
  useEffect(() => {
    const savedFoodsFromStorage = localStorage.getItem("savedFoods");
    if (savedFoodsFromStorage) {
      setSavedFoods(JSON.parse(savedFoodsFromStorage));
    }
  }, []);

  // Save savedFoods to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedFoods", JSON.stringify(savedFoods));
    console.log(localStorage.getItem("savedFoods"))
  }, [savedFoods]);

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
    let opt: keyof typeof d = (prompt("Where is your food stored? " + validOpts.join(", ")) || "unrefrigerated") as keyof typeof d;
    opt = opt.toLowerCase().trim() as keyof typeof d;
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
      <p><i>click an item to remove</i></p>
      {/* <ul> */}
      {savedFoods
        .slice()
        .sort((a, b) => {
          if (a.date === "inf") return 1;
          if (b.date === "inf") return -1;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .map(({ name, date }) => (
          <div key={name}
            className="food-item"
            onClick={() => {
              // remove the food from the list
              setSavedFoods(savedFoods.filter((f) => f.name !== name));
            }}
          >
            <img src={eDates[name].image_url} alt={name} width={100} /><br></br>
            {name}:
            {" "}{
              date === "inf" ? "♾" : (date < new Date() ? "Expired " : "") + formatDistanceToNow(date, { addSuffix: true })
            }</div>
        ))}
      {/* </ul> */}
      <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
    </main>
  );
}

export default Home