const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const StatusSchema = Schema({
    
    status_id:{
        type:Number
    },
    status_code:{
        type:Number
    },
    status_desc:{
        type:String
    }
 });
 StatusSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("status_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("status_id")
            .then(counter => {
                doc.status_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.status_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('StatusSchema', StatusSchema);