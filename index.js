const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.post('/login', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'empdata.json'), 'utf8'));

  const employid = req.body.empid;
  const password = req.body.password;
  const user = users.find((emp) => emp.empid === employid && emp.password === password);

  if (user) {
    res.redirect('/eps'); 
  } else {
    res.send('Login failed. Please check your credentials.');
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'))
})

app.post('/signup', (req, res) => {
  // Read the existing user data from the JSON file
  const users = JSON.parse(fs.readFileSync(__dirname + '/data/empdata.json', 'utf8'));

  const newUser = {
      empid: req.body.empid,
      password: req.body.password,
      username: req.body.username,
      designation: req.body.designation
      
  };
  users.push(newUser);

  fs.writeFileSync(__dirname + '/data/empdata.json', JSON.stringify(users));

  res.redirect('/login');
});

app.get('/eps', (req, res) => {
  res.sendFile(path.join(__dirname, 'eps.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log("EPMS running on port no. " + port)
})