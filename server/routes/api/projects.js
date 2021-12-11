
// hei sinä joka luet tätä: mä tiiän et tää ois ehk parempi jos nää ois ripoteltu omiin kansioihin
// ja siellä sitten omiin tiedostoihin (esim middleware yms) mut näin alkuun mulle itelleni on helpompaa
// kun kaikki on samassa roskassa. ehkei oo sinänsä käytännöllisin ratkaisu mut mennään jooko tällä

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
      return `${req.body.title}-${file.originalname}`;  // tallenneteaan omalla nimellä, jos if-ehdot täyttyvät
    }
    // 'palautetaan' tallennussijainti jne // bucketName = The GridFs collection to store the file (default: fs)
    return {
      bucketName: projectsDB.collection,
      filename: `${req.body.title}-${file.originalname}`
    }
  }
});

const upload = multer({
  storage: storage
});

// get projects
router.get('/', async (req, res) => {
  const projects = await loadProjectCollection(projectsDB.collection);
  res.send(await projects.find({}).toArray()); // find all
});

// add projects
router.post('/', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const projects = await loadProjectCollection(projectsDB.collection);

  let fileInput = null;
  if(req.file){
    fileInput = req.file.id;
  }
    await projects.insertOne({
      title: req.body.title,
      descr: req.body.descr,
      repo: req.body.repo,
      file_id: fileInput
    });
  res.status(201).send();
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
        url: 'http://localhost:5000/api/projects/files/' + pic.filename // HUOM KOVAKOODAUS
      });
    });
  return res.status(200).send(picInfos);
  }catch(e){
    return res.status(500).send({
      message: 'Kuvien haussa on käynyt virhe!',
      error: e.message
    });
  }
});

// watch project pictures (download & zoom in)
router.get('/files/:name', async (req, res) => {
  try{  // ei kutsuta loadProjectsCollectionin avulla perinteisesti, sillä halutaan spesifimmän määrityksen
    const mongoClient = new mongodb.MongoClient(projectsDB.url);
    await mongoClient.connect();
    const db = mongoClient.db(projectsDB.database);
    const bucket = new mongodb.GridFSBucket(db, {
        bucketName: projectsDB.collection
    });

    const dwnldStream = bucket.openDownloadStreamByName(req.params.name);

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
