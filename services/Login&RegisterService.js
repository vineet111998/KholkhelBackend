loginRegister=require('../models/userRegister');
const crypto = require('crypto');

class LoginANDRegister{

    register(data)
        {
            console.log(data);
            return new Promise((resolve,reject)=>{
                const query = loginRegister.findOne({'user_email': data.user_email});
                query.exec(function(err,user){
                    if (err) return handleError(err);
                    if(user==null)
                        {
                            data.user_pass=crypto.createHash('md5').update(data.user_pass).digest('hex');
                            const user=new loginRegister(data);
                            user.save().then(data => {
                                    resolve({ message:"Registered Successfully, Please Login",
                                                code:200
                                                })
                            });
                        }
                    else
                    {
                        resolve({ message:"User already registered!!, Please Login!!",code:208});
                    }
                    })
            
            });
        };

    login(data)
    {
        return new Promise((resolve,reject)=>{
            const query = loginRegister.findOne({'user_email': data.user_email,'userType':data.userType});
            query.exec(function(err,user){
                    if (err) return handleError(err);
                    if(user==null)
                        {
                            resolve({
                                message:"User not registered, Please Register before Login",
                                code:"404"
                            })
                        }
                    else
                        {
                            data.user_pass=crypto.createHash('md5').update(data.user_pass).digest('hex');
                                if(user.user_pass!= data.user_pass)
                                {
                                    resolve({
                                        message:"Credentials are not correct",
                                        code:"401"
                                    });
                                }
                                else{
                                    resolve({
                                        message:"Logined Successfully",
                                        data:user,
                                        code:"200"
                                    });
                                }
                        }
            });
        })
    };

     checkNumber(data){
//        return new Promise((resolve, reject) => {
////            const statusSchema = new StatusSchema(data);
//            loginRegister.findOne().then(data => {
//                resolve({
//                    message: "Status Saved Successfully",
//                    code: 200
//                })
//            });
//        });
    // console.log(data);
    }

}
module.exports= new LoginANDRegister();