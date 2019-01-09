const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

// creating a constructor for product modal
class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  // creating method to save the data to the database
  save() {
    const db = getDB(); // gives the db connection
    let dbOp;
    if (this._id) {
      // update the product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // insert the product
      dbOp = db.collection('products').insertOne(this); //  creating and referring to collection in the database
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDB();
    // gets all the item in the collection // find can be confirgured // return a cursor, the there can be million of documents in the collection // can pulling up all document can be inefficient
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDB();

    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(prodId) })
      .next()
      .then(product => {
        // console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDB();

    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then(result => {
        console.log('deleted a product');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
