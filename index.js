const express = require('express');
const DatabaseConnection = require('./database/DatabaseConnection')
const port = '8000';
const app = express();
const dbConnect = new DatabaseConnection();
const bodyparser = require('body-parser');
const cookieparser=require('cookie-parser');
const session=require('express-session');
const route = require('./routes/getQuiz');
const loginRoute = require('./routes/Login&Register');
const multiLinguinal =require('./routes/multiLinguinal');
const ai=require('./routes/ai');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');
var ldap = require('ldapjs');
const Axios = require('axios')
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

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.json());
app.use(cors(corsOpts));
app.use(cookieparser());
app.use(bodyparser.urlencoded());
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

async function downloadImage(url, filepath) {
  const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
  });
  return new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath)); 
  });
}
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
 while (counter < length) {
   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
app.post('/saveImageFromUrl', async (req, res) =>{
  let iamgeName=makeid(6);
  // if()
  var imageUrl=req.body.imageUrl
  let downloadStatus=await downloadImage(imageUrl,"upload/"+iamgeName+".jpg");
  res.send(downloadStatus)
});
app.post('/saveImageFromUrlForArtifact', async (req, res) =>{
  let iamgeName=makeid(6);
  // if()
  var imageUrl=req.body.imageUrl
  let downloadStatus=await downloadImage(imageUrl,"artifact/"+iamgeName+".jpg");
  res.send(downloadStatus)
})

//////////////////////////////////////////////// picture game image upload ////////////////////////////////////////////
var upload = multer({ dest: "upload/" })
app.post("/uploadImage", upload.single('file'), async(req, res) => {
  // res.send("done");
  var imageName = req.file.originalname.replace(" ", "_");
  var oldpath = req.file.path;
  let newName=makeid(6);
  var newpath = 'upload/' + newName+imageName;
  console.log("..........................");
  console.log("newpath  : " + newpath);
  fs.rename(oldpath, newpath, function (err) {
    if (err)
      throw err;
    else {
      res.send(newpath);
    }
    // res.write('ile uploaded and moved!');
    // res.writeHead(200);
    // res.end();
  });
  
});
//////////////////////////////////////////////// Bulk picture game image upload ////////////////////////////////////////////
var upload = multer({ dest: "upload/" })
app.post("/uploadbulkImage", upload.array('file'), (req, res) => {
  var counter=0;
  var path=[];
  for (var i = 0; i < req.files.length;i++)
  {
    var imageName = req.files[i].originalname.replace(" ", "_");
    var oldpath = req.files[i].path;
    // var newpath = 'upload/' + imageName;
    let newName=makeid(6);
    var newpath = 'upload/' + newName+imageName;
    path.push(newpath);
    fs.rename(oldpath, newpath, function (err) {
      if(err) counter++; 
  })
}

  if(counter >0)
  {
    // res.write('Error Occured!!!');
  }
  else{
    // res.write('File uploaded and moved!');
  }
  // res.end();
  // console.log(path)
  res.send(JSON.stringify(path));
});
////////////////////////////////////////////////////// Artifact Upload ////////////////////////////////////////////////////
var artifactUpload = multer({ dest: "artifact/" })
app.post("/uploadArtifact", artifactUpload.single('file'), (req, res) => {
  console.log("..............................");
  console.log(req.file)
  // res.send("done");
  var imageName = req.file.originalname.replace(" ", "_");
  console.log("imageName: " + imageName);
  var oldpath = req.file.path;
  // var newpath = 'artifact/' + imageName;
  let newName=makeid(6);
  var newpath = 'artifact/' + newName+imageName;
  console.log("newpath"+newpath);
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    else
    res.send(newpath);
    // res.write('File uploaded and moved!');
    // res.writeHead(200);
    // res.end();
  });
  // console.log(newpath);
  
});
/////////////////////////////////////////////////////// avadhan game image upload /////////////////////////////////////////////
var avadhanImageUpload = multer({ dest: "avadhanImages/" })
app.post("/uploadImageforAvadhan", avadhanImageUpload.single('file'), (req, res) => {
  var imageName = req.file.originalname.replace(" ", "_");
  var oldpath = req.file.path;
  var newpath = 'avadhanImages/' + imageName;
  fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    else
    res.send(newpath)
    // res.write('File uploaded and moved!');
    // res.writeHead(200);
    // res.end();
  });
  
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
app.use('/aiapi', ai);

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
