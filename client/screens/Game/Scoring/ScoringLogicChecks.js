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
  return {matched, counter};
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

// ! trial functions
// const keys = (Object.keys(checkMultiples(diceFiveOfAKind, 4).counter).filter(key => (checkMultiples(diceFiveOfAKind, 4).counter)[key] !== 4))
// const values = (Object.values(checkMultiples(diceFiveOfAKind, 4).counter).filter(item => item !== 4))

// const newObject = (keys, values) => {
//   const newArray = []
//   for (let i = 0; i < keys.length; i++) {
//   newArray.push({key: keys[i], value: values[i]})
// }
// return newArray;
// }
