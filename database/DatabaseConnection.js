const mongoose = require('mongoose');
require("dotenv/config");
class DatabaseConnection{
    constructor(){
        this.databaseConnection = mongoose;
    }
    getDb(){
      var checkConnection = this.setDb();
        if(checkConnection)
            {
                // console.log("connected to DB!!!");
                return this.databaseConnection;
            }
            throw new Error('Database Connection Error!!');
    }
    setDb(){
        // this.databaseConnection.connect('mongodb://'+process.env.DATABASE_IP+':'+process.env.PORT+'/GameApi',()=>{
            // console.log('connecting to Database');
            this.databaseConnection.connect('mongodb://127.0.0.1:27017/GameApi', () => {
            console.log("connected!!!");
            // return true;
        });
    //    return false;
    }
}
module.exports =DatabaseConnection;
