var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')
// var postData = require("./postData.json")

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
  defaultLayout: "main"
}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get("/", function(req, res) {
  res.status(200).render("metronome")
})

app.get("/automation", function(req, res) {
  res.status(200).render("automation")
})

app.get("/about", function(req, res) {
  res.status(200).render("about")
})


// app.get("/posts/:post_number", function(req, res, next) {
//   var post_number = req.params.post_number
//   var post_content = postData[post_number]
//   if (post_content) {
//     res.status(200).render("singlePost", post_content)
//     console.log("rendering post number", post_number, "from handlebars")
//   }
//   else {
//     next()
//   }
// })

app.get('*', function (req, res) {
  res.status(404).render("404")
  console.log("rendering 404 page")
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
