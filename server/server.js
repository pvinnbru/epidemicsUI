const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const toml = require('toml');
const bodyParser = require('body-parser');
const iarna_toml = require('@iarna/toml');
const cors = require('cors');
const {connectToDb, getDb} = require('../db/db')
const usersRouter = require('../src/Schemas/User/Apis/users'); // Import the users router
const filesRouter = require('../src/Schemas/Files/files'); // Import the files router
const { get } = require('http');
const ObjectId = require('mongodb').ObjectId;

//default config toml file, where values are empty
const defaultConfigPath = ".\\src\\assets\\defaultConfig.toml";

// Cross Origin port 4200->1300
// wenn nicht aktiviert fehler
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// nach cors installation server-neustart
// use VOR app.get

// Use the users router for '/users' routes
app.use('/users', usersRouter);
app.use('/files', filesRouter)



// Converting json to toml via iarna_toml
app.post('/convert', (req, res) => {
  
  try {
      const tomlString = iarna_toml.stringify(req.body);
      res.send(tomlString);
  } catch (error) {
      res.status(500).send('Error converting to TOML');
  }
});


//app-route for database access
app.get('/showWorkbench', async (req, res) => {
  let files = []
  const db = getDb()
  try { 
    const query = buildMongoQuery(req.query)
  await db.collection('workbench')
    .find(query)
    //.sort({ })
    .forEach(file => files.push(file));

  res.status(201).json(files);

  } 
  catch (error) {
    res.status(440).json({ error: 'Database collections could not be reached' });
  }
});


app.get('/show', async (req, res) => {
  let files = []
  const db = getDb()
  //query must look like this: { 'json.Simulation.seed' : { $lt: 260 } }
  try {
    //put collection name inside db.collection
    //making the query a valid call to the mongodb 
    const query = buildMongoQuery(req.query)
  await db.collection('files')
    .find(query) // returns cursor object
    //.sort({ }) //can be used for sorting (which will be implemented later on)
    .forEach(file => files.push(file));

  res.status(200).json(files);

  } 
  catch (error) {
    res.status(440).json({ error: 'Database collections could not be reached' });
  }
});


function buildMongoQuery(queryParams) {
  let query = {};

  for (let key in queryParams) {
    try {
      // Attempt to parse each query parameter value as JSON
      query[key] = JSON.parse(queryParams[key]);
    } catch (e) {
      // If parsing fails, use the raw value
      query[key] = queryParams[key];
    }
  }
  return query;
}


connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})


// create a new blank toml file in the backend

app.post('/add-blank-toml', async (req, res) => {
  let { name, user } = req.body;
  console.log("Handling POST request: addBlankTomlFile triggered");
  if (user == null) {
    user = 'guest';
  }
  const toml = await parseTomlFile(defaultConfigPath);
  
  try {
    const db = getDb();
    const fileCollection = db.collection('workbench');
    let file = { name, toml, user }

    await fileCollection.insertOne(file);

    res.status(201).json({ message: 'File added to workbench' });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add File to workbench' });
  }

});

function parseTomlFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const parsedToml = toml.parse(data);
        resolve(parsedToml);
      } catch (parseErr) {
        reject("Failed to parse TOML: " + parseErr.message);
      }
    });
  });
}

app.delete('/deleteFromWorkbench', (req, res) => {
    try {
      const db = getDb();
      const fileCollection = db.collection('workbench');

      const _id = new ObjectId(req.query._id);
      fileCollection.deleteOne( {_id: _id} );
      res.status(201).json({ message: 'File deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete File' });
    }
  });