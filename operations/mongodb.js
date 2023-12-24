const express = require("express");
const app = express();
const bodyparser = require('body-parser');
// const hbs = require('express-handlebars');


app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


const { getDatabase,ObjectId } = require("./mongo.js");

app.get("/", async (req, res) => {
  try {
    let message,edit_id,edit_book;
    const database = await getDatabase();
    const collection = database.collection("newoff");
    const cursor = collection.find({});
    const books = await cursor.toArray();

    if (req.query.edit_id) {
      edit_id = req.query.edit_id;
      edit_book = await collection.findOne({_id:ObjectId(edit_id) });
    }
      switch (req.query.status) {
        case "1":
          message = " value inserted ";
          break;
        default:
          break;
      }
    res.render("main", { message, books, edit_id, edit_book });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/store_value", async (req, res) => {
  try {
    const newdata = await getDatabase();
    const newcol = newdata.collection("newoff");
    let value = { title: req.body.title, author: req.body.author };
      await newcol.insertOne(value);
      console.log(`data added`);
    return res.redirect("/?status=1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
});



app.listen(3010, () => {
    console.log("server start");
})