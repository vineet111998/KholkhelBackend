const theme = require('../models/theme');
const mongoose = require('mongoose');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class themeService{

    setTheme(data)
        {
            return new Promise((resolve,reject)=>{
            const themeData=new theme(data);
            themeData.save().then(data => {
                    resolve({ message:"Theme Saved Successfully",
                                  code:200
                                })
            });
            });
        }
    }
module.exports= new themeService();