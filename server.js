var path = require('path');
var fs = require("fs")
var express = require('express');
var exphbs = require('express-handlebars')
var program_data = require("./programData.json");
const { stringify } = require('querystring');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({
  defaultLayout: "main"
}))

app.set('view engine', 'handlebars')

app.use(express.json())
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

app.post("/automation/newProgram", function(req, res, next) {
  var new_program = {
    name:"new program " + (program_data.length + 1),
    program: []
  }
  JSON.stringify(new_program)
  program_data.push(new_program)
  update_db(res)
})

app.post("/automation/deleteProgram/:idx", function(req, res, next) {
  var idx = req.params.idx
  if (program_data.length > idx) {
    program_data.splice(idx, 1)
    update_db(res)
  }
  else {
    next()
  }
})

app.post("/automation/:idx/saveProgram", function(req, res, next) {
  var idx = req.params.idx
  if (program_data[idx]) {
    if (req.body && req.body.name && req.body.program) {
      var new_program = {
        name:req.body.name,
        program:req.body.program
      }
  
      program_data[idx] = new_program
      update_db(res)
    } 
    else {
      res.status(400).send("Request didn't have a body with a 'name' and 'program'")
    }
  }
  else {
    next()
  }
})

app.get('*', function (req, res) {
  res.status(404).render("404")
})

app.listen(port, function () {
  console.log("== Server is listening on port", port)
})

function update_db(res) { // writes server version of program_data to hard copy
  fs.writeFile(
    "./programData.json",
    JSON.stringify(program_data, null, 2),
    function (err) {
      if (err) {
        res.status(500).send("Error writing to database")
      } 
      else {
        res.status(200).send("Data written to database")
      }
    }
  )
}
