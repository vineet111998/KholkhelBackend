const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const TypesOfEvent = Schema({

    master_event_type_id:{
        type:Number
    },
    master_event_type_name:{
        type:String
    },
    master_event_type_desc:{
        type:String
    },
    master_event_type_status:{
        type:Number
    }
 });
//  TypesOfEvent.virtual('statusdata', {
//     ref: 'StatusSchema', // The model to use
//     localField: 'game_status', // The field in playerListSchema
//     foreignField: 'status_code' // The field on videoSchema. This can be whatever you want.
// });

// TypesOfEvent.set('toObject', { virtuals: true })
// TypesOfEvent.set('toJSON', { virtuals: true })

 TypesOfEvent.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("master_event_type_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("master_event_type_id")
            .then(counter => {
                doc.master_event_type_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.master_event_type_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('TypesOfEvents', TypesOfEvent);