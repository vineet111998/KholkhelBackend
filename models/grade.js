const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const GradeSchema = Schema({

    grade_id:{
        type:Number
    },
    grade_code:{
        type:Number
    }
 });
 GradeSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("grade_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("grade_id")
            .then(counter => {
                doc.grade_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.grade_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('GradeSchema', GradeSchema);