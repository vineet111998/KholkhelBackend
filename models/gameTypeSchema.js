const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const GameTypeSchema = Schema({
    
    game_type_id:{
        type:Number
    },
    game_name:{
        type:String
    },
    game_desc:{
        type:String
    },
    game_status:{
        type:Number
    },
    master_game_type_id:{
        type:Number
    }
 });
 GameTypeSchema.virtual('statusdata', {
    ref: 'StatusSchema', // The model to use
    localField: 'game_status', // The field in playerListSchema
    foreignField: 'status_code' // The field on videoSchema. This can be whatever you want.
});
GameTypeSchema.virtual('alltypesofgamesdata', {
    ref: 'AllTypesOfGames', // The model to use
    localField: 'master_game_type_id', // The field in playerListSchema
    foreignField: 'master_game_type_id' // The field on videoSchema. This can be whatever you want.
});

GameTypeSchema.set('toObject', { virtuals: true })
GameTypeSchema.set('toJSON', { virtuals: true })

 GameTypeSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("game_type_id").
    then(counter => {
         console.log("asdasd", counter);
        if(!counter) {
             counsole.log("hello");
            sequencing.insertCounter("game_type_id")
            .then(counter => {
                doc.game_type_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.game_type_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('GameType', GameTypeSchema);