
const express = require('express');
const url = require('url');
const mysql = require('mysql');
const path = require('path');
const util = require('util');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


//yhteys
const conn = mysql.createConnection({
  host: "localhost",
  user: "olso",
  password: "olso",
  database: "portfolio"
})

const query = util.promisify(conn.query).bind(conn);

// GET
app.get("/api/db", function (req, res){
  const q = url.parse(req.url, true).query;
  const sql = 'select projects.title, projects.descr, projects.repo, projects.img from projects';

  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      const rows = await query(sql);
      res.send(rows);
      console.log(rows);
    }
    catch (err) {
      console.log("Database error!"+ err);
    }
    finally {}
  })()
});

// SET
app.post('/api/db', urlencodedParser, function(req, res){
  console.log(req.body);
/*
  const sqlPUT = 'insert into projects values(null, "'
      + req.body.title + '", "'
      + req.body.descr + ', "'
      + req.body.motto + '")';

  (async () => {  // IIFE (Immediately Invoked Function Expression)
    try {
      await query(sqlPUT);
      res.send('POST succesful!!')
    } catch (err) {
      res.send("POST was not succesful... " + err);
    } finally {}
  })()
*/
})


app.use(express.json());
app.listen(8080, () => console.log('Listening at http://localhost:8080/api/db'));
