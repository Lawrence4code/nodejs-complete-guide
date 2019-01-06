const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// this helps in parsing the input to object with key value pair and calls next after parsing

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'pageNotFound.html'));
});

app.listen(3000); // create a unending loop listening to the port.
