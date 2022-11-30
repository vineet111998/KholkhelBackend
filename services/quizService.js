const userQuiz = require('../models/userQuiz');
const mongoose = require('mongoose');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class quizService{

    setQuiz(data)
        {
            return new Promise((resolve,reject)=>{
            const user=new userQuiz(data);
            user.save().then(data => {
                    resolve({ message:"Question Saved Successfully",
                                  code:200
                                })
            });
            });
        }
    }
module.exports= new quizService();