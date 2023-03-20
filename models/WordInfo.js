const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const WordInfo = Schema({

    word_id: {
        type: Number
    },
    word_length: {
        type: Number
    },
    word_attr: {
        type: Array
    }
});

WordInfo.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("word_id").
        then(counter => {
            // console.log("asdasd", counter);
            if (!counter) {
                // counsole.log("hello");
                sequencing.insertCounter("word_id")
                    .then(counter => {
                        doc.word_id = counter;
                        // console.log(doc)
                        next();
                    })
                    .catch(error => next(error))
            } else {
                doc.word_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});

module.exports = mongoose.model('WordInfo', WordInfo);