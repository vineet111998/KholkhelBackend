const express = require('express');
const DatabaseConnection = require('./database/DatabaseConnection')
const port = 8000;
const app = express();
const dbConnect = new DatabaseConnection();
const bodyparser = require('body-parser');
const cookieparser=require('cookie-parser');
const session=require('express-session');
const route = require('./routes/getQuiz');
const loginRoute = require('./routes/Login&Register');
const multiLinguinal =require('./routes/multiLinguinal');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');
// var ldap = require('ldapjs');
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.json());
app.use(cors(corsOpts));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
session({
// key:"userId",
secret:"kholkhel",
resave:false,
saveUninitialized:true,
cookie: { maxAge: oneDay },
})
);
//////////////////////////////////////////////// picture game image upload ////////////////////////////////////////////
var upload = multer({ dest: "upload/" })
app.post("/uploadImage", upload.single('file'), (req, res) => {
  // res.send("done");
  var imageName = req.file.originalname.replace(" ", "_");
  var oldpath = req.file.path;
  var newpath = 'upload/' + imageName;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    res.write('File uploaded and moved!');
    // res.writeHead(200);
    res.end();
  });
  res.send(newpath)
});
////////////////////////////////////////////////////// Artifact Upload ////////////////////////////////////////////////////
var artifactUpload = multer({ dest: "artifact/" })
app.post("/uploadArtifact", artifactUpload.single('file'), (req, res) => {
  // res.send("done");
  var imageName = req.file.originalname.replace(" ", "_");
  var oldpath = req.file.path;
  var newpath = 'artifact/' + imageName;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    res.write('File uploaded and moved!');
    // res.writeHead(200);
    res.end();
  });
  res.send(newpath)
});
/////////////////////////////////////////////////////// avadhan game image upload /////////////////////////////////////////////
var avadhanImageUpload = multer({ dest: "avadhanImages/" })
app.post("/uploadImageforAvadhan", avadhanImageUpload.single('file'), (req, res) => {
  var imageName = req.file.originalname.replace(" ", "_");
  var oldpath = req.file.path;
  var newpath = 'avadhanImages/' + imageName;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    res.write('File uploaded and moved!');
    // res.writeHead(200);
    res.end();
  });
  res.send(newpath)
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/getImage', (req, res) => {
//console.log("hello")
  const ImageName = req.query.imgName;
  console.log(ImageName);
  console.log(__dirname)
  res.sendFile(ImageName, { root: __dirname });
});

app.use('/', loginRoute);
app.use('/game', route);
app.use('/lang', multiLinguinal);

dbConnect.setDb();// Database Connection

/////////////////////////////////////// LDAP CONNECTION///////////////////////////////////////////////////

// var client = ldap.createClient({
//   url: 'ldap://192.168.19.241:10389'
// });

// function authenticateDN(username, password) {

//   /*bind use for authentication*/
//   client.bind(username, password, function (err) {
//       if (err) {
//           console.log("Error in new connetion " + err)
//       } else {
//           /*if connection is success then go for any operation*/
//           console.log("Success");
//       }
//   });
// }
// authenticateDN("uid=admin,ou=system","secret");
//////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log("Listening to port: " + port)
});
