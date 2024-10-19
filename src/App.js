import logo from './logo.svg';
import './App.css';
import expDates from './expDates.json';
import {add} from 'date-fns';
import {useState} from 'react';

function App() {
  const [dates, setDates] = useState({});
  function addDuration(durationArray) {
    if (!Array.isArray(durationArray) || durationArray.length !== 2) {
      throw new Error('Invalid duration array');
    }
    const [amount, unit] = durationArray;
    const duration = { [unit]: parseInt(amount, 10) };
    return add(new Date(), duration);
  }

  const findExpireDates = (foodName) => {
    const foodData = expDates[foodName.toLowerCase().trim()];
    if (!foodData) {
      return null;
    }

    if (foodData.refrigerated) {
      foodData.refrigerated = addDuration(foodData.refrigerated);
    }

    if (foodData.frozen) {
      foodData.frozen = addDuration(foodData.frozen);
    }

    if (foodData.unrefrigerated) {
      foodData.unrefrigerated = addDuration(foodData.unrefrigerated);
    }

    return {
      name: foodName.toLowerCase().trim(),
      category: foodData.category,
      refrigerated: foodData.refrigerated,
      frozen: foodData.frozen,
      unrefrigerated: foodData.unrefrigerated,
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" id="foodName" placeholder="Enter food name" onChange={(e) => setDates(findExpireDates(e.target.value))} />
        <p>{JSON.stringify(dates || {})}</p>
      </header>
    </div>
  );
}

export default App;
