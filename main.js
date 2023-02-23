const express = require('express')
const app = express()
const port = process.env.PORT || 3000
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

app.use(cors());
app.use(express.static('public'));



app.get('/home', (req, res) => {
       res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.post('/contattaci', (req, res) => {
       var body = qs.parse(req.body.data)
       const mailData = {
              from: body.email,  // sender address
              to: 'info.digitalizenow@gmail.com',   // list of receivers
              subject: 'Ciao, ' + body.nome + " " + body.cognome + ' ti vuole contattare',
              text: body.motivo + " ricontattalo a : " + body.email
       };
       transporter.sendMail(mailData, function (err, info) {
              if (err) {
                     res.sendStatus(500);
              } else
                     res.sendStatus(200);
       });
})

app.get('/contatti', (req, res) => {
       res.sendFile(path.join(__dirname, '/public/contatti.html'));
})

app.get('/chisiamo', (req, res) => {
       res.sendFile(path.join(__dirname, '/public/chisiamo.html'));
})

app.get('/sitemap.xml', (req, res) => {
       res.sendFile(path.join(__dirname, '/public/404.html'));
})


app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, '/public/sitemap.xml'));
})

server.listen(port, function () { });