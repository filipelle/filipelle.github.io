const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
var bodyParser = require('body-parser')
const path = require('path');
const nodemailer = require('nodemailer');
const server = require('http').Server(app);
var qs = require('querystring')


// create application/json parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// create application/x-www-form-urlencoded parser

const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
              user: 'info.digitalizenow@gmail.com',
              pass: 'wifttvrugigvwvhd',
       },
       tls: {
              rejectUnauthorized: false
       }
});

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/scripts'));
app.use(express.static(__dirname + '/public/images'));

app.set("views", path.join(__dirname, "/public/views"));



app.use("/views", express.static(__dirname + "public/views"));

app.get('/', (req, res) => {
       res.sendfile("index.html");
})

app.post('/contattaci',  (req, res) => {
       var body = qs.parse(req.body.data)
       console.log(body);
       const mailData = {
              from: body.email,  // sender address
              to: 'info.digitalizenow@gmail.com',   // list of receivers
              subject: 'Ciao, ' + body.nome+ " " + body.cognome + ' ti vuole contattare',
              text: body.description
       };
       transporter.sendMail(mailData, function (err, info) {
              if (err){
                      res.sendStatus(500);
             
                     console.log(err)
              } else
                  res.sendStatus(200);
       });
       
      
})



// app.get('*', function (req, res) {
//        res.status(404).sendFile('404');
// });


server.listen(process.env.PORT || 4200, function () { });