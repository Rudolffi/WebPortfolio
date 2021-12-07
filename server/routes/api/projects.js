
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

const fileFilter = (req, file, cb) => { // tekiskö try/catch?
  if(file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png'
      || file.mimetype === 'image/gif'){
    // accept file
    cb(null, true);
  } else {
    // reject file
    cb(new Error(Error.message), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// get posts
router.get('/', upload.single('projectImage'), async (req, res) => {
  console.log(req.file);
  const projects = await loadProjectCollection();
  res.send(await projects.find({}).toArray()); // find all
});

/*
// leevi's add post
router.post('/api/db', upload.fields([{
  name: 'file',
}, {
  name: 'files',
}]), function(req, res){
  const formData = req.body;
  console.log('form data', formData);
  console.log('img', formData.title);
  res.send(req.file);
});*/

// add posts
router.post('/', async (req, res) => {
  const projects = await loadProjectCollection();
  await projects.insertOne({
    title: req.body.title,
    descr: req.body.descr,
    repo: req.body.repo,
    file: req.body.file,
    files: req.body.files
  });
  // http-response : 201 = everything went ok and something was created
  res.status(201).send();
});


// delete posts
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
