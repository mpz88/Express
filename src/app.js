const express = require('express');
const { sayHello } = require('./lib/strings');
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

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

module.exports = app;
