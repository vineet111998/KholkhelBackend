const tilesSchema = require('../models/tilesSchema');
const TileType = require('../models/TileType');
const mongoose = require('mongoose');
const { resolve } = require("path");
const { reject, promise } = require('bcrypt/promises');
const { json } = require('body-parser');
const { populate } = require('../models/tilesSchema');
const gametype = require('../models/gameTypeSchema');

class tilesService {

    setTiles(data) {
        // console.log(data);
        return new Promise((resolve, reject) => {
            const tiles = new tilesSchema(data);
            tiles.save().then(data => {
                resolve({
                    data:data,
                    message: "Tiles Saved Successfully",
                    code: 200
                })
            });
        });
    }

    setTilesType(data) {
        return new Promise((resolve, reject) => {
            const tileType = new TileType(data);
            tileType.save().then(data => {
                resolve({
                    message: "Tiles Type Saved Successfully",
                    code: 200
                })
            });
        });
    }
    getTilesType() {
        return new Promise((resolve, reject) => {
            TileType.find().then(data => {
                resolve({
                    data: data,
                    code: 200
                })
            });
        });
    }
     getTilesToStartGame() {

        return new Promise(async (resolve, reject) => {
            var datetime = new Date();
            console.log(datetime);
            var successResult = { data: [], message: "All tiles found successfully", code: 200 };
            await tilesSchema.find({tile_start_date:{$lte: datetime},tile_end_date: { $gte: datetime }}).then(data => {
                successResult.data.push(data);
                resolve(successResult);

            });

        });
    }
    getAllTiles() {

        return new Promise((resolve, reject) => {
            tilesSchema.find().then(data=>{
                resolve({
                    data:data,
                    code:200
                })
            });

        });
    }
    getActivityList(ID) {
        return new Promise((resolve, reject) => {
            TileType.find(ID).then(data => {
                resolve({
                    data: data,
                    code: 200
                })
            });
        });
    }
     getEventbyGrade(data)
        {
             return new Promise((resolve,reject)=>{
            tilesSchema.find(data).then(res => {
                    resolve({ data:res,
                                  code:200
                                })
            });
            });
        }
         getEventbyUserid(data)
        {
             return new Promise((resolve,reject)=>{
            tilesSchema.find(data).then(res => {
                    resolve({ data:res,
                                  code:200
                                })
            });
            });
        }
        setEventbyid(data)
        {
            // console.log(data[0]);
            // console.log(data[1]);
            return new Promise((resolve,reject)=>{
                tilesSchema.updateMany(data[0],data[1]).then(res => {
                    // console.log(res);
                        resolve({
                            message:"Successfully Updated",
                                      code:200
                                    })
                });
                });   
        }

        getEventbyid(data)
        {
            return new Promise((resolve,reject)=>{
                tilesSchema.find(data).then(res => {
                        resolve({
                                   data:res,
                                      code:200
                                    })
                });
                });
        }
}
module.exports = new tilesService();