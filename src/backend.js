
const express = require('express');
const url = require('url');
const mysql = require('mysql');
const path = require('path')

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "example_db"
});
const app = express();
/*
app.get("/api/helsinki", function (req, res){
  const q = url.parse(req.url, true).query;
  const startDate = q.start;
  const endDate = q.end;
  const sql = "SELECT event_date.Date, event.Name, event.Type, Location.Location_name"
      + " FROM event_date, event, location"
      + " WHERE event_date.Event_id = event.Event_id and event.Location_Location_id = Location.Location_id"
      + " and event_date.Date >= ? and event_date.Date <= ?"
      + " GROUP BY Name"
      + " ORDER BY event_date.Date";

  var util = require('util'); // for async calls
  // node native promisify
  const query = util.promisify(conn.query).bind(conn); // is bind needed?

  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      const rows = await query(sql,[startDate, endDate]);
      res.send(rows)
    }
    catch (err) {
      console.log("Database error!"+ err);
    }
    finally {
      //conn.end();
    }
  })()
})

// nodetehtävä 8
app.get("/api/helsinki/location", function (req, res){
  const q = url.parse(req.url, true).query;
  const locName = q.name;
  const sql = "SELECT * FROM location WHERE Location_name = ?"

  var util = require('util'); // for async calls
  // node native promisify
  const query = util.promisify(conn.query).bind(conn); // is bind needed?

  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      const rows = await query(sql,[locName]);
      res.send(rows)
    }
    catch (err) {
      console.log("Database error!"+ err);
    }
    finally {
      //conn.end();
    }
  })()
})

// tämä tärkeä
app.get("/helsinki", function (req, res){
  res.sendFile(path.join(__dirname + "/listofevents.html"));
})

app.use(express.json())
//app.use(cors())

app.listen(8080, () => console.log('Listening on port 8080'));*/
