const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");

const mstQuizSchema =Schema({
    

    mqi_question:{
        type: String,
    },
    mqi_options:{
        type: Array,
        required: true
    },
    mqi_answer:{
        type:String,
    }
});
mstQuizSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("theme_id").
    then(counter => {
        if(!counter) {
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

module.exports = mongoose.model('mst_quiz_info', mstQuizSchema);