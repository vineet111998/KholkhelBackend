const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const tesType = Schema({
    
    type_id:{
        type:Number,
        
    },
    tile_name:{
        type:String
    }
 });

 tesType.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("type_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("type_id")
            .then(counter => {
                doc.type_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.type_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});


 module.exports = mongoose.model('typeDrive',tesType);
 