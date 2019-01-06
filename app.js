const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
// this helps in parsing the input to object with key value pair and calls next after parsing

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not found' });
});

app.listen(3000); // create a unending loop listening to the port.
