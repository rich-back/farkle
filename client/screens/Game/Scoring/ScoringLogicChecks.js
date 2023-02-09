const checkOne = (keptDice) => {
  let keptOnes = [];
  keptDice.forEach((di) => {
    if (di.value === 1) {
      keptOnes.push(di);
    }
  });
  return keptOnes;
};

const checkFive = (keptDice) => {
  let keptFives = [];
  keptDice.forEach((di) => {
    if (di.value === 5) {
      keptFives.push(di);
    }
  });
  return keptFives;
};

const checkMultiples = (keptDice, multiple) => {
  let counter = {};
  for (element of keptDice) {
    if (counter[element.value]) {
      counter[element.value] += 1;
    } else {
      counter[element.value] = 1;
    }
  }
  var matched = Object.keys(counter).filter((value) => {
    return counter[value] === multiple;
  });
  return { matched, counter };
};

const checkQuadPair = (keptDice) => {
  let quad = checkMultiples(keptDice, 4).matched;
  let double = checkMultiples(keptDice, 2).matched;
  let result = false;
  if (quad.length === 1 && double.length === 1) {
    result = true;
  }
  return result;
};

module.exports = { checkOne, checkFive, checkMultiples, checkQuadPair };



const extraScoringDiceChecker = (keptDice, multiple) => {
  const keys = Object.keys(checkMultiples(keptDice, multiple).counter).filter(
    (key) => checkMultiples(keptDice, multiple).counter[key] !== multiple
  );
  const values = Object.values(checkMultiples(keptDice, multiple).counter).filter(
    (item) => item !== multiple
  );
  const newArray = [];
  for (let i = 0; i < keys.length; i++) {
    newArray.push({ key: keys[i], value: values[i] });
  }
  let total = 0;
  const ones = newArray.find(element => element.key == 1) || { key: 0, value: 0}
  const fives = newArray.find(element => element.key == 5) || { key: 0, value: 0}
  total += (ones.value * 100) + (fives.value * 50)
  return total;
};


