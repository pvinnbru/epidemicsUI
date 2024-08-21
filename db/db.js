
// js to connect to MongoDB

const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
  connectToDb: async () => {
    
    // Replace the url with your MongoDB server's URL
    const url = 'mongodb://127.0.0.1:27017';
    
    const client = new MongoClient(url);

    client.connect()
      .then(() => {
        dbConnection = client.db('documents');
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
  },
  getDb: () => dbConnection,

  

};

