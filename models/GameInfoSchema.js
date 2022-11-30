const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const helper = require("../config/helper");

const GameInfoSchema = Schema({
    game_info_id: {
        type: Number
    },
    game_type_id: {
        type: Number
    },
    game_code: {
        type: String
    },
    game_attr: {
        type: Array
    },
    game_artifact: {
        type: Object
    },
    game_answer_status: {
        type: Boolean
    },
    game_desc: {
        type: String
    },
    master_game_type_id:{
        type:Number
    },
    status_id:{
        type:Number
    }
});
GameInfoSchema.virtual('statusdata', {
    ref: 'StatusSchema', // The model to use
    localField: 'status_id', // The field in playerListSchema
    foreignField: 'status_code' // The field on videoSchema. This can be whatever you want.
});
GameInfoSchema.virtual('alltypesofgamesdata', {
    ref: 'AllTypesOfGames', // The model to use
    localField: 'master_game_type_id', // The field in playerListSchema
    foreignField: 'master_game_type_id' // The field on videoSchema. This can be whatever you want.
});
GameInfoSchema.virtual('gametypedata', {
    ref: 'GameType', // The model to use
    localField: 'game_type_id', // The field in playerListSchema
    foreignField: 'game_type_id' // The field on videoSchema. This can be whatever you want.
});

GameInfoSchema.set('toObject', { virtuals: true })
GameInfoSchema.set('toJSON', { virtuals: true })

GameInfoSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("game_info_id").
        then(counter => {
            if (!counter) {
                sequencing.insertCounter("game_info_id")
                    .then(counter => {
                        doc.game_info_id = counter;
                        // console.log(doc)
                        next();

                    })
                    .catch(error => next(error))
            } else {
                doc.game_info_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});

GameInfoSchema.pre("save", function (next) {
    let doc = this;
    helper.getGameCode(doc.game_type_id).then(data => {
        console.log(doc);
        doc.game_code = data[0].game_name + "-" + data[0].game_type_id + "-" + doc.game_info_id;
        next();
    });
});

module.exports = mongoose.model('GameInfo', GameInfoSchema);