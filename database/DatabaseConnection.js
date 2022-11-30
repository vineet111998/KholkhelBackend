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
        // this.databaseConnection.connect(process.env.DB_CONNECTION,()=>{
            this.databaseConnection.connect('mongodb://'+process.env.DATABASE_IP+':'+process.env.PORT+'/QuizApi',()=>{
            console.log("connected!!!");
            // return true;
        });
    //    return false;
    }
}
module.exports =DatabaseConnection;