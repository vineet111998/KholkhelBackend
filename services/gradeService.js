const gradeSchema = require('../models/grade');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class GradeService {

    setGrade(data) {
        return new Promise((resolve, reject) => {
            const grade = new gradeSchema(data);
            grade.save().then(data => {
                resolve({
                    message: "Grade Saved Successfully",
                    code: 200
                })
            });
        });
    }

    getGrade(data) {
        return new Promise((resolve, reject) => {
            gradeSchema.find().then(data => {
                resolve({
                    data: data,
                    code: 200
                })
            });
        });
    }
}
module.exports = new GradeService();
