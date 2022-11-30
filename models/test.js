const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const typeModel= require('./type');
 const testSchema = Schema({
    
    test_type_id:{
        type: Number,
    },
    test_id:{
        
        type:Number
    },
    test_desc:{
        type:String
    }
 });

 testSchema.virtual('typeUser', {
    ref: 'typeDrive', // The model to use
    localField: 'test_type_id', // The field in playerListSchema
    foreignField: 'type_id', // The field on videoSchema. This can be whatever you want.
  });

 testSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("test_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("test_id")
            .then(counter => {
                doc.test_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.test_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('testDrive',testSchema);

