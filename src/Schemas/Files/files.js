const express = require('express');
const router = express.Router();
const { getDb } = require('../../../db/db');
const File = require('../Files/file');
const ObjectId = require('mongodb').ObjectId;


// route to create a new file in the template database
router.post('/create', async (req, res) => {
  // Get the name, toml, author, and description from the request body
    const { name, toml, author, description } = req.body;
  
    try { 
      const db = getDb();
      //specifying the collection to be used
      const fileCollection = db.collection('files');
  
      const currDate = new Date();
      const dateWithoutTime = currDate.toLocaleDateString();
      //creating a new file matching the Scheme of files in the files collection
      const newFile = new File({
        name, 
        toml, 
        author, 
        description,
        date: dateWithoutTime // Current date
      });

      await fileCollection.insertOne(newFile);
      res.status(201).json({ message: 'File created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create File' });
    }
  });


  //route to add a file to the workbench
  router.post('/addToWorkbench', async (req, res) => {
    // Get the name, toml, and user from the request body
    let { name, toml, user } = req.body;  
    // If the user is not logged in, the user is set to 'guest'
    if (user == null) {
      user = 'guest';
    }
    try {
      const db = getDb();
      // Get the workbench collection
      const fileCollection = db.collection('workbench');
      //specifying how the file should look like
      let file = { name, toml, user }
  
      await fileCollection.insertOne(file);

      res.status(201).json({ message: 'File added to workbench' });
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add File to workbench' });
    }
  });


  //route to update files in the workbench
  router.post('/update', async (req, res) => {
    const toml = req.body.toml;
    // Convert the string id to an ObjectId to match the type in the database
    const _id = new ObjectId(req.body._id);

    try {
        const db = getDb();
        const fileCollection = db.collection('workbench');

        // Update the document with the new TOML content
        await fileCollection.findOneAndUpdate(
            { _id: _id }, // Filter by unique id
            { $set: { toml: toml } }, // Set new TOML content
        );
        res.status(201).json({ message: "File updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update File' });
    }
});

  module.exports = router;