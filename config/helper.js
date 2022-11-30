const gameType =require('../models/gameTypeSchema');
// const fileUpload =require('../models/fileUpload');
const getGameCode =(ID)=>{
    return new Promise((resolve,reject)=>{
        // gameType.find(?)
//        console.log(gameType);
        gameType.find({game_type_id: ID},function(err,data){
            
            if(err)
            {
                resolve(err);
            }
            else
            {
                resolve(data);
            }   
        });
    });
}
    // const getAllID=(ID)=>{
    //     return new Promise((resolve,reject)=>{
    //         // gameType.find(?)
    //         console.log(gameType);
    //         gameType.find({tile_id: ID},function(err,data){
                
    //             if(err)
    //             {
    //                 resolve(err);
    //             }
    //             else
    //             {
    //                 resolve(data);
    //             }   
    //         });
    //     });
    // }
    // const getFileCode=(ID)=>{
    //     return new Promise((resolve , reject)=>{
    //         fileUpload.find({file_id: ID},function(err,data){
            
    //             if(err)
    //             {
    //                 resolve(err);
    //             }
    //             else
    //             {
    //                 resolve(data);
    //             }   
    //         });
    //     })
    // }
    


module.exports ={
     getGameCode
    
    //  getFileCode
}
