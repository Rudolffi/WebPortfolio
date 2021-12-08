const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadedImg/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
});

// get posts
router.get('/', async (req, res) => {
  const projects = await loadProjectCollection();
  res.send(await projects.find({}).toArray()); // find all
});

// add posts
router.post('/', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const projects = await loadProjectCollection();
  let filePath = null;
  let shouldSave = true;

  if(req.file){
    if(req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/gif'){
      filePath = req.file.path;
    } else {
      shouldSave = false;
      res.send('Try again')
    }
  }

  if(shouldSave){
    await projects.insertOne({
      title: req.body.title,
      descr: req.body.descr,
      repo: req.body.repo,
      file: filePath
    });
  }

  // http-response : 201 = everything went ok and something was created
  res.status(201).send();
});


// delete post
router.delete('/:id', async (req, res) => {
  const projects = await loadProjectCollection();
  await projects.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadProjectCollection(){
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://juustokumine:juustokumina@cluster0.5rodh.mongodb.net', {
    useNewUrlParser: true
  });

  return client.db('portfolio').collection('projects');
}

module.exports = router;
