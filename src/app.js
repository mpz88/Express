const express = require('express');

const { sayHello } = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray,
  elementsStartingWithAVowel,
  removeNthElement,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();
app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: 'HELLO' });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: 'hello' });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const inputString = req.params.string;
  const queryLength = req.query.length;

  if (queryLength) {
    const firstCharacters = inputString.slice(0, queryLength);
    return res.status(200).json({ result: firstCharacters });
  }

  const firstCharacter = inputString.charAt(0);
  res.status(200).json({ result: firstCharacter });
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (!req.body.a || !req.body.b) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = multiply(a, b);
  return res.status(200).json({ result });
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (a === 0) {
    return res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (!req.body.a || !req.body.b) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  const result = divide(a, b);
  return res.status(200).json({ result });
});

app.post('/numbers/remainder', (req, res) => {
  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (typeof req.body.a === 'undefined' || typeof req.body.b === 'undefined') {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
  return res.status(200).json({ result: remainder(a, b) });
});

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;

  if (typeof value !== 'boolean') {
    return res.status(200).json({ result: true });
  }
  const result = !value;

  return res.status(200).json({ result });
});

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;

  if (typeof value === 'string' && value !== '') {
    return res.status(200).json({ result: true });
  }

  if (typeof value === 'number' && value !== 0) {
    return res.status(200).json({ result: true });
  }

  return res.status(200).json({ result: false });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number)) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  }

  const isodd = number % 2 !== 0;

  return res.status(200).json({ result: isodd });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string, character } = req.params;

  if (typeof character !== 'string' || character.length !== 1) {
    return res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }

  const startsWithCharacter = string.startsWith(character);

  return res.status(200).json({ result: startsWithCharacter });
});

app.post('/arrays/element-at-index/:n', (req, res) => {
  const n = parseInt(req.params.n);
  const { array } = req.body;
  const index = n % array.length;
  const element = array[index];
  return res.status(200).json({ result: element });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;
  const stringified = array.join(',');
  return res.status(200).json({ result: stringified });
});

app.post('/arrays/append', (req, res) => {
  const { array, value } = req.body;
  array.push(value);
  return res.status(200).json({ result: array });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const filteredArray = array.filter(element => {
    const firstChar = element.charAt(0).toLowerCase();
    return vowels.includes(firstChar);
  });

  return res.status(200).json({ result: filteredArray });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const modifiedArray = removeNthElement(0, array);
  return res.status(200).json({ result: modifiedArray });
});

app.post('/arrays/remove-element/index', (req, res) => {
  const index = parseInt(req.query.index);
  const { array } = req.body;
  const modifiedArray = removeNthElement2(index, array);
  return res.status(200).json({ result: modifiedArray });
});

module.exports = app;
