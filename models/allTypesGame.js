const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const AllTypesGames = Schema({
    
    master_game_type_id:{
        type:Number
    },
    master_game_type_name:{
        type:String
    },
    master_game_type_desc:{
        type:String
    },
    master_game_type_status:{
        type:Number
    }
 });
//  AllTypesGames.virtual('statusdata', {
//     ref: 'StatusSchema', // The model to use
//     localField: 'game_status', // The field in playerListSchema
//     foreignField: 'status_code' // The field on videoSchema. This can be whatever you want.
// });

// AllTypesGames.set('toObject', { virtuals: true })
// AllTypesGames.set('toJSON', { virtuals: true })

 AllTypesGames.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("master_game_type_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("master_game_type_id")
            .then(counter => {
                doc.master_game_type_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.master_game_type_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('AllTypesOfGames', AllTypesGames);