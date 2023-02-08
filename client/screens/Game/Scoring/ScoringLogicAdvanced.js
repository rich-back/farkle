const checkOne = (keptDice) => {
    let keptOnes = []
    keptDice.forEach((di) => {
        if (di.value === 1) {
        keptOnes.push(di);
        }})
    return keptOnes;
    }

const checkFive = (keptDice) => {
    let keptFives = []
    keptDice.forEach((di) => {
        if (di.value === 5) {
        keptFives.push(di);
        }})
    return keptFives;
    }

const diceThreeOfAKind = [
    { key: "dice1", value: 2 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 1 },
    { key: "dice4", value: 2 },
    { key: "dice5", value: 1 },
    { key: "dice6", value: 1 },
  ];

const checkMultiples = (keptDice, multiple) => {
    let counter = {};
    for( element of keptDice){
        if(counter[element.value]){
            counter[element.value] += 1
        } else {
            counter[element.value] = 1
        }
    }
    var matched = Object.keys(counter).filter((value) => {return counter[value] === multiple})
    return matched;
}


// console.log(checkMultiples(diceThreeOfAKind, 3))


module.exports = { checkOne, checkFive, checkMultiples }
