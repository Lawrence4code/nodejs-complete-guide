const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use((req, res, next) => {
//   console.log('I am from the first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log(
//     'I am from the second middleware the will only appear if next is called in my predecessor'
//   );
//   res.send('<h1> From the second middleware, awesome right? </h1>');
// });

app.use(bodyParser.urlencoded({ extended: false }));
// this helps in parsing the input to object with key value pair and calls next after parsing

app.use('/', (req, res, next) => {
  console.log('This route always runs');
  next();
});

app.post('/add-product', (req, res, next) => {
  res.send(
    '<form action="/products" method="POST"> <input type="text" name="title" > <button type="submit"> Add Product </button> </form>'
  );
});

app.use('/products', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('I am from the second middleware');
  res.send('<h1> Hello from express server :) </h1>');
});

app.listen(3000); // create a unending loop listening to the port.
