const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
const TileTypeSchema = Schema({

    tile_type_id: {
        type: Number
    },
    tile_name: {
        type: String
    },
    tile_desc: {
        type: String
    },
    tile_attr: {
        type: Array
    }
});

TileTypeSchema.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("tile_type_id").
        then(counter => {
            // console.log("asdasd", counter);
            if (!counter) {
                // counsole.log("hello");
                sequencing.insertCounter("tile_type_id")
                    .then(counter => {
                        doc.tile_type_id = counter;
                        // console.log(doc)
                        next();
                    })
                    .catch(error => next(error))
            } else {
                doc.tile_type_id = counter;
                next();
            }
        })
        .catch(error => next(error))
});

module.exports = mongoose.model('TileType', TileTypeSchema);