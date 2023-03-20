const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const sequencing = require("../config/counter");
 const KholkhelUserInfo = Schema({
    
    user_id:{
        type:Number
    },
    user_firstname:{
        type:String
    },
    user_lastname:{
        type:String
    },
    user_username:{
        type:String
    },
    user_number:{
        type:String
    },
    user_email:{
        type:String
    },
    lang_id:{
        type:Number
    },
    user_pass:{
        type:String
    },
     userType:{
        type:Number
    }
 });
KholkhelUserInfo.virtual('langdata', {
    ref: 'LanguagesSchema', // The model to use
    localField: 'lang_id', // The field in playerListSchema
    foreignField: 'lang_id' // The field on videoSchema. This can be whatever you want.
});
 KholkhelUserInfo.set('toObject', { virtuals: true })
KholkhelUserInfo.set('toJSON', { virtuals: true })


 KholkhelUserInfo.pre("save", function (next) {
    let doc = this;
    sequencing.getSequenceNextValue("user_id").
    then(counter => {
        // console.log("asdasd", counter);
        if(!counter) {
            // counsole.log("hello");
            sequencing.insertCounter("user_id")
            .then(counter => {
                doc.user_id = counter;
                // console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc.user_id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

 module.exports = mongoose.model('KholkhelUserInfo', KholkhelUserInfo);