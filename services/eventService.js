const event = require('../models/typesOfEvent');
const mongoose = require('mongoose');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class eventService{

    setEventType(data)
        {
            return new Promise((resolve,reject)=>{
            const eventData=new event(data);
            eventData.save().then(data => {
                    resolve({ message:"Event Type Saved Successfully",
                                  code:200
                                })
            });
            });
        }
        getEventType(data)
        {
            return new Promise((resolve,reject)=>{
            event.find(data).then(res => {
                    resolve({ data:res,
                                  code:200
                                })
            });
            });
        }

    }
module.exports= new eventService();