const mongoose =require('mongoose');
const Schema = mongoose.Schema;
// const counter =require('./counter');
const sequencing = require("../config/counter");

 const themeSchema = Schema({

    theme_id:{
        type:Number
    },
    theme_name:{
        type:String
    },
    theme_primary_color:{
        type:String
    },
    theme_secondary_color:{
        type:String
    },
    theme_tertiary_color:{
        type:String
    },
    theme_qoute:{
        type:String
    },
    theme_logo:{
        type:String
    },
    theme_start_date:{
        type:Date
    },
    theme_end_date:{
        type:Date
    }
 });


// var entitySchema = mongoose.Schema({
//     testvalue: {type: String}
// });

// themeSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'theme_id'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.theme_id = counter.seq;
//         next();
//     });
// });

themeSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("theme_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("theme_id")
            .then(counter => {
                doc.theme_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.theme_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});
 module.exports = mongoose.model('theme', themeSchema);