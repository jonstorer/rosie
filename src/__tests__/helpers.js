function randomString() {
  return Math.random().toString(36).split('.')[1].slice(0, 5);
}

function randomInt() {
  return Math.ceil(100 * Math.random());
}

module.exports = { randomString, randomInt };
