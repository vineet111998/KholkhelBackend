const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const LanguagesSchema = Schema({

    lang_id: {
        type: Number
    },
    lang_name: {
        type: String
    },
    lang_desc: {
        type: String
    },
    lang_status: {
        type: Number
    },
    lang_color:{
    type:String
    }
});

LanguagesSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("lang_id").
        then(counter => {
            // console.log("asdasd", counter);
            if (!counter) {
                // counsole.log("hello");
                sequencing.insertCounter("lang_id")
                    .then(counter => {
                        doc.lang_id = counter;
                        // console.log(doc)
                        next();
                    })
                    .catch(error => next(error))
            } else {
                doc.lang_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});

module.exports = mongoose.model('Languages', LanguagesSchema);