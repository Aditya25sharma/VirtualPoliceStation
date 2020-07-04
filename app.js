const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/", function(req, res) {
  res.render("Home");
});

app.get("/Home", function(req, res) {
  res.render("Home");
});

app.get("/Contact", function(req, res) {
  res.render("Contact");
});

app.get("/Service", function(req, res) {
  res.render("Service");
});

app.get("/Register", function(req, res) {
  res.render("Register");
});

app.post("/Register", function(req, res) {

  console.log("inside post");
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email
  const password = req.body.password
  const data = {
    update_existing: true,
    members: [{
      email_address: email,
      password: password,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/ccd3acae03";

  const options = {
    method: "POST",
    auth: "AdityaS:c328370cc603205463345027580943e7-us19"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      console.log("sucess200");
      res.render("Success");
    } else {
      res.render("/");
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})

app.get("/LoginPolice", function(req, res) {
  res.render("LoginPolice");
});

app.get("/LoginDatabase", function(req, res) {
  res.render("LoginDatabase");
});

app.get("/LoginMedical", function(req, res) {
  res.render("LoginMedical");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("i am at port 3000")
})

// https://maps.googleapis.com/maps/api/place/search/json?location=37.785835,-122.406418&rankby=distance&types=police&sensor=false&key=AIzaSyCGIo-JPFs7LJhfEvVZhlUSjgFoChuBteM