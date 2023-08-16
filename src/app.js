const express = require('express');
const { sayHello } = require('./lib/strings');
const { add } = require('./lib/numbers');

const app = express();
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
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  res.status(200).json({ result: add(a, b) });
});

module.exports = app;
