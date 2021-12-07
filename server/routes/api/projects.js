
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts
router.get('/', async (req, res) => {

  const projects = await loadProjectCollection();
  res.send(await projects.find({}).toArray()); // find all
});


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
