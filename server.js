var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')
var program_data = require("./programData.json")

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
  res.status(200).render("automation", {programs:program_data})
})

app.get("/about", function(req, res) {
  res.status(200).render("about")
})


app.get("/automation/program/:program_index", function(req, res, next) {
  var program_index = req.params.program_index
  var program = program_data[program_index]
  if (program) {
    res.status(200).render("programPlanner", {
      name:program.name,
      blocks:program.program 
    })
  }
  else {
    next()
  }
})

app.get('*', function (req, res) {
  res.status(404).render("404")
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
