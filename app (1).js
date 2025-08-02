const math = require("./mathUtils");
module.exports = (req, res) => {
  const a = 100;
  const b = 50;
  const addition = math.add(a, b);
  const subtraction = math.subtract(a, b);
  console.log(`Addition of ${a} and ${b} is: ${addition}`);
  console.log(`Subtraction of ${a} and ${b} is: ${subtraction}`);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Math Operations</h1>
    <p>Addition of ${a} and ${b} is: ${addition}</p>
    <p>Subtraction of ${a} and ${b} is: ${subtraction}</p>
  `);
};
