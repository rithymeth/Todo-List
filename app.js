const express = require("express");

const bodyParser = require("body-parser");

const app = express();

var items = [];

var workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", (req, res) => {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("todo", { workTitle: day, newListItems: items });
});
app.post("/", (req, res) => {
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})
app.get("/work", (req, res) => {
    res.render("todo", {workTitle: "Work List", newListItems: workItems})
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})