const getNthElement = (n, array) => {
  const index = n % array.length;
  return array[index];
};

const arrayToCSVString = array => {
  return array.reduce((acc,curr)=>{
    return `${acc},${curr}`
  });
  };
  
const csvStringToArray = string => {
  return string.split(',')
};

function addToArray(element, array) {
 const animal = array.push (element)
} 

const addToArray2 = (element, array) => {
  return [...array, element];
};

const removeNthElement = (index, array) => {
  array.splice(index,1)
};

const numbersToStrings = numbers => {
 return numbers.map((number)=>number.toString());
};

const uppercaseWordsInArray = strings => {
  return strings.map((word) => word.toUpperCase());
};

const reverseWordsInArray = strings => {
  return strings.map((word) => word.split('').reverse().join(''));
};

const onlyEven = numbers => {
  return numbers.filter((n) => n % 2 == 0);
};

const removeNthElement2 = (index, array) => {
  const newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
};

const elementsStartingWithAVowel = strings => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return strings.filter((element) =>
    vowels.some(vowel => element.toLowerCase().startsWith(vowel))
  );
};

const removeSpaces = string => {
  return string.split(' ').join('');
  };

const sumNumbers = numbers => {
 const sum = numbers.reduce((acc, curr) => acc + curr, 0);
 return sum;
};

const sortByLastLetter = strings => {
  return strings.sort((a, b) => a.slice(-1).localeCompare(b.slice(-1)));
};

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter
};
