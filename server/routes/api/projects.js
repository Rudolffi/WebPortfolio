const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const projectsDB = require('../../configuration/dbConfig'); // db-config

// defining gridfsstorage, which will store files DIRECTLY to mongodb
const storage = new GridFsStorage({
  url: projectsDB.url + projectsDB.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true},
  file: (req, file) => {
    if(file.contentType === 'image/jpeg'
        || file.contentType === 'image/jpg'
        || file.contentType === 'image/png'){
      return file.originalname;  // tallenneteaan omalla nimellä, jos if-ehdot täyttyvät
    }
    // 'palautetaan' tallennussijainti jne // bucketName = The GridFs collection to store the file (default: fs)
    return {
      bucketName: projectsDB.collection
    }
  }
});

const upload = multer({
  storage: storage
});

// get projects
router.get('/', async (req, res) => {
  const projects = await loadProjectCollection();
  res.send(await projects.find({}).toArray()); // find all
});

// add projects
router.post('/', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const projects = await loadProjectCollection();

    await projects.insertOne({
      title: req.body.title,
      descr: req.body.descr,
      repo: req.body.repo,
      file_id: req.file.id
    });

  // http-response : 201 = everything went ok and something was created
  res.status(201).send();
});


// delete projects
router.delete('/:id', async (req, res) => {
  const projects = await loadProjectCollection();
  await projects.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

// get project pictures

// watch project pictures (download)


async function loadProjectCollection(){
  const client = await mongodb.MongoClient.connect
  (projectsDB.url, {
    useNewUrlParser: true
  });
  return client.db(projectsDB.database).collection(projectsDB.collection);
}

module.exports = router;
