const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const helper = require("../config/helper");
// console.log(helper);
// const helper =require("../config/helperTest/index");

const Fileupload = Schema({
    artifact_id: {
        type: Number
    },
    artifact_name: {
        type: String
    },
    artifact_location: {
        type: Object
    }
});

Fileupload.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("artifact_id").
        then(counter => {
            if (!counter) {
                sequencing.insertCounter("artifact_id")
                    .then(counter => {
                        doc.artifact_id = counter;
                        // console.log(doc)
                        next();

                    })
                    .catch(error => next(error))
            } else {
                doc.artifact_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});
module.exports = mongoose.model('artifact_info', Fileupload);