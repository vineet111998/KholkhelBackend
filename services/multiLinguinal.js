const lang = require('../models/languages');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class multiLinguinal {
    addLang(data) {
        return new Promise((resolve, reject) => {
            const language = new lang(data);
            language.save().then((msg) => {
                resolve({
                    message: "Data Uploaded Successfully!!",
                    code: 200
                })
            })

        })
    }
    getLang(data) {
        return new Promise((resolve, reject) => {
            lang.find(data).sort("lang_id").then((msg) => {
                resolve({
                    message: "data Founded Successfully!!",
                    data: msg,
                    code: 200
                })
            })

        })
    }
}
module.exports = new multiLinguinal();
