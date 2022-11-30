const { json } = require('body-parser');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");

const TilesSchema = Schema({
    tile_id: {
        type: Number
    },
    tile_desc: {
        type: String
    },
    tile_gameData:{
        type:Array
    },
    tile_type: {
        type: Array
    },
    tile_game_info: {
        type: Array
    },
    tile_artifact_info: {
        type: Object
    },
    tile_grade_id:{
        type: Number
    },
    event_type_id: {
        type: Number
    },
    tile_start_date: {
        type: Date
    },
    tile_end_date: {
        type: Date
    },
    tile_user_id: {
        type: Number
    },

});

TilesSchema.virtual('eventTypeData', {
    ref: 'TypesOfEvents', // The model to use
    localField: 'event_type_id', // The field in playerListSchema
    foreignField: 'master_event_type_id' // The field on videoSchema. This can be whatever you want.
});
TilesSchema.virtual('gamedata', {
    ref: 'GameInfo', // The model to use
    localField: 'tile_game_info_id', // The field in playerListSchema
    foreignField: 'game_info_id' // The field on videoSchema. This can be whatever you want.
});

TilesSchema.virtual('tiletypedata', {
    ref: 'TileType', // The model to use
    localField: 'tile_type_id', // The field in playerListSchema
    foreignField: 'tile_type_id' // The field on videoSchema. This can be whatever you want.
});

TilesSchema.virtual('gradedata', {
    ref: 'GradeSchema', // The model to use
    localField: 'tile_grade_id', // The field in playerListSchema
    foreignField: 'grade_id' // The field on videoSchema. This can be whatever you want.
});
TilesSchema.virtual('userinfo', {
    ref: 'KholkhelUserInfo', // The model to use
    localField: 'tile_user_id', // The field in playerListSchema
    foreignField: 'user_id' // The field on videoSchema. This can be whatever you want.
});

TilesSchema.set('toObject', { virtuals: true })
TilesSchema.set('toJSON', { virtuals: true })

TilesSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("tile_id").
        then(counter => {
            // console.log("asdasd", counter);
            if (!counter) {
                // counsole.log("hello");
                sequencing.insertCounter("tile_id")
                    .then(counter => {
                        doc.tile_id = counter;
                        // console.log(doc)
                        next();
                    })
                    .catch(error => next(error))
            } else {
                doc.tile_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});

// TilesSchema.pre("save", function (next) {
//     let doc=this;
//     helper.getAllID(doc.tile_id).then(data =>{
//         console.log(data);
//         // doc.tile_code = doc.tile_theme_id +"-"+doc.tile_type_id +"-"+ doc.tile_game_info_id;
//         next();
//     });
// });

module.exports = mongoose.model('Tiles', TilesSchema);