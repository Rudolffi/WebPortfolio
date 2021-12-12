
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
        || file.contentType === 'image/png'
        || file.contentType === 'image/gif'){
      return `${file.originalname}`;  // tallenneteaan omalla nimellä, jos if-ehdot täyttyvät
    }
    // 'palautetaan' tallennussijainti jne // bucketName = The GridFs collection to store the file (default: fs)
    return {
      bucketName: projectsDB.collection,
      filename: `${file.originalname}`
    }
  }
});

// get projects
router.get('/', async (req, res) => {
  const projects = await loadProjectCollection(projectsDB.collection);
  res.send(await projects.find({}).toArray()); // find all
});

// add projects
router.post('/', multer({ storage: storage }).fields([
    {name:"file", maxCount: 1}, {name:"files", maxCount: 8}]),
    async (req, res) => {
  try{
      const projects = await loadProjectCollection(projectsDB.collection);

      let thumbnailID = null;
      let picturesID = [];
      if(req.files['file'][0])   // if there is a thumbnail picture
        thumbnailID = req.files['file'][0].id;

      if(req.files['files'].length) // if not empty
        req.files['files'].forEach(p => picturesID.push(p.id));

        await projects.insertOne({
          title: req.body.title,
          descr: req.body.descr,
          repo: req.body.repo,
          thumb_id: thumbnailID,
          pics_id: picturesID
        });

      res.status(201).send();
  }catch(e){
    return res.status(500).send({
      message: 'Virhe',
      error: e.message
    });
  }
});

// delete projects ## tää täytyy modata sillai että poistetaan sit kans liitteitä
router.delete('/:id', async (req, res) => {
  const projects = await loadProjectCollection(projectsDB.collection);
  await projects.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

// get project pictures
router.get('/files', async (req, res) => {
  try{
    const pictureCollection = await loadProjectCollection(projectsDB.collection + '.files');
    const pictures = pictureCollection.find({});

    if((await pictures.count()) === 0)
      return res.status(5000).send({
        message: 'Kuvia ei löytynyt!'
      });

    const picInfos = [];
    await pictures.forEach((pic) => {
      picInfos.push({
        _id: pic._id,
        name: pic.filename,
        url: 'http://localhost:5000/api/projects/files/' + pic._id // HUOM KOVAKOODAUS
      });
    });
  return res.status(200).send(picInfos);
  }catch(e){
    return res.status(500).send({
      message: 'Virhe 123',
      error: e.message
    });
  }
});

// watch project pictures (download & zoom in)
router.get('/files/:id', async (req, res) => {
  try{  // ei kutsuta loadProjectsCollectionin avulla perinteisesti, sillä halutaan spesifimmän määrityksen
    const mongoClient = new mongodb.MongoClient(projectsDB.url);
    await mongoClient.connect();
    const db = mongoClient.db(projectsDB.database);
    const bucket = new mongodb.GridFSBucket(db, {
        bucketName: projectsDB.collection
    });

    const picID = new mongodb.ObjectID(req.params.id);

    const dwnldStream = bucket.openDownloadStream(picID);

    dwnldStream.on('data', (data) => {
      return res.status(200).write(data);
    });

    dwnldStream.on('error', (e) => {
      return res.status(404).send({
        message: 'Kuvaa ei voitu ladata'
      });
    });

    dwnldStream.on('end', () => {
      return res.end();
    });
  }catch(e){
      return res.status(500).send({
        message: 'Virhe',
        error: e.message
      });
  }
});

async function loadProjectCollection(coll){
  const client = await mongodb.MongoClient.connect
  (projectsDB.url, {
    useNewUrlParser: true
  });
  return client.db(projectsDB.database).collection(coll);
}

module.exports = router;
