const router = require("express");
const { getDatabase } = require("../mongo");

router.get("/", async (req, res) => {
  try {
    let message;
    const database = await getDatabase();
    const collection = database.collection("users");
    const cursor = collection.find({});
    const books = await cursor.toArray();
    switch (req.query.status) {
      case "1":
        message = "value insert successfully";
        break;

      default:
        break;
    }
    res.render("main", {message,books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/store_value", async (req, res) => {
  try {
    const newdata = await getDatabase();
    const newcol = newdata.collection("newoff");
    let value = { title: req.body.title, author: req.body.author };
    await newcol.insertOne(value);
    return res.redirect("/?status=1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
