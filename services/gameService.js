const GameInfoSchema = require('../models/GameInfoSchema');
const gameTypeSchema = require('../models/gameTypeSchema');
const Fileupload = require('../models/fileUpload');
const WordInfo =require('../models/WordInfo');
const StatusSchema =require('../models/status');
const AllTypesGames= require('../models/allTypesGame');
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class gameService {

    setGame(data) {
        return new Promise((resolve, reject) => {
            const gameInfo = new GameInfoSchema(data);
            gameInfo.save().then(data => {
                resolve({
                    message: "Game Saved Successfully",
                    code: 200
                })
            });
        });
    }
    setStatus(data){
        return new Promise((resolve, reject) => {
            const statusSchema = new StatusSchema(data);
            statusSchema.save().then(data => {
                resolve({
                    message: "Status Saved Successfully",
                    code: 200
                })
            });
        });
    }
    getStatus(data){
        return new Promise((resolve, reject) => {
            StatusSchema.find(data).then((res) => {
                resolve({
                    data:res,
                    code:200
                })
            });



        });
    }

    setGameType(data) {
        return new Promise((resolve, reject) => {
            const gameType = new gameTypeSchema(data);
            gameType.save().then(data => {
                resolve({
                    message: "Game Type Saved Successfully",
                    code: 200
                })
            });
        });
    }
    getGameType(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            gameTypeSchema.find(data).populate('alltypesofgamesdata').populate('statusdata').then((res) => {
                resolve(res);
            });
        });
    }

    getGameInfo(data) {
        return new Promise((resolve, reject) => {
            GameInfoSchema.find(data).populate('gametypedata').populate('alltypesofgamesdata').populate('statusdata').then((res) => {
                resolve(res);
            });
        });
    }
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
    getWordInfo(data){
        return new Promise((resolve, reject) => {
            const wordInfo = new WordInfo(data);
            wordInfo.save().then(data => {
                resolve({
                    message: "Word Added Successfully",
                    code: 200
                })
            });
        });
    }
    getWordInfoByLength(ID) {
        return new Promise((resolve, reject) => {
            WordInfo.find(ID).then(data => {
                if(data.length > 0){
                    resolve({
                        message:"Word Already Existed in Repository",
                        data: data,
                        code: 200
                    })    
                }
                else{
                resolve({
                    message: "Word not existed In Repository",
                    data: data,
                    code: 200
                })
            }
            });
        });
    }

    setMasterGameType(data){
        return new Promise((resolve, reject) => {
            const allTypesGames = new AllTypesGames(data);
            allTypesGames.save().then(data => {
                resolve({
                    message: "Master Game Type Added Sccessfully",
                    code: 200
                })
            });
        });
    }
    getMasterGameType(data){
        return new Promise((resolve, reject) => {
            AllTypesGames.find(data).then(data => {
                resolve({
                    message: "Master Data found successfully",
                    data: data,
                    code: 200
                })
            });
        });
    }
}
module.exports = new gameService();
