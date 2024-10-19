import { add } from 'date-fns';
import expDates from './expDates.json';
expDates = Object.freeze(expDates);
function addDuration(durationArray) {
  if (!Array.isArray(durationArray) || durationArray.length !== 2) {
    throw new Error('Invalid duration array: ' + durationArray);
  }
  const [amount, unit] = durationArray;
  const duration = { [unit]: parseInt(amount, 10) };
  return add(new Date(), duration);
}

const findExpireDates = (foodName) => {
  const foodData = expDates[foodName.toLowerCase().trim()];
  console.log(expDates[foodName.toLowerCase().trim()]);
  if (!foodData) {
    return null;
  }

  console.log(foodData);

  if (foodData.refrigerated && foodData.refrigerated !== "inf") {
    console.log("refrigerated", foodData.refrigerated);
    foodData.refrigerated = addDuration(foodData.refrigerated);
  }

  if (foodData.frozen && foodData.frozen !== "inf") {
    console.log("frozen", foodData.frozen);
    foodData.frozen = addDuration(foodData.frozen);
  }

  if (foodData.unrefrigerated && foodData.unrefrigerated !== "inf") {
    console.log("unrefrigerated", foodData.unrefrigerated);
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
export default findExpireDates;