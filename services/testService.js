const test =require('../models/test');
class testService{
getAllTest()
{
    return new Promise((resolve,reject)=>{
        
        test.find({}).then((data)=>{
            console.log(data);
            resolve(data);
        }).catch((error)=>{
            reject(error);
        });

    })
}
}
module.exports= new testService();
// PlaylistModel
//   .findOne({
//     // ... whatever your find query needs to be
//   })
//   .populate('videoList')
//   .exec(function (error, playList) {
//     /* if a playList document is returned */
//     playList.videoList; // The would be the populated array of videos
//   })