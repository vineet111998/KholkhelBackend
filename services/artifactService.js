const Fileupload = require('../models/fileUpload');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class artifactService {
    pictureUpload(data) {
        return new Promise((resolve, reject) => {
            const fileUpload = new Fileupload(data);
            fileUpload.save().then((msg) => {
                resolve({
                    message: "File Uploaded Successfully!!",
                    code: 200
                })
            })

        })
    }
    getArtifact() {
        return new Promise((resolve, reject) => {
            Fileupload.find().then((msg) => {
                resolve({
                    message: "File Founded Successfully!!",
                    data: msg,
                    code: 200
                })
            })

        })
    }
}
module.exports = new artifactService();
