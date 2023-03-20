const express= require('express');
const router=express.Router();
const userService =require('../services/Login&RegisterService')
router.get('/', (req,res)=>{
    res.send("LOGIN AND REGISTER HERE");
})
router.post('/register',(req,res)=>{
    const user={
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_username: req.body.user_username,
        user_email: req.body.user_email,
        lang_id: req.body.lang_id,
        user_pass: req.body.user_pass,
        userType: req.body.userType
    };

    userService.register(user).then((msg)=>{

        res.json(msg);

    },(error)=>{
       res.json(msg);
    });
});

router.post('/login',(req,res)=>{
    const user={
        user_email: req.body.user_email,
        user_pass: req.body.user_pass,
        userType: req.body.userType
    };
    userService.login(user).then((msg)=>{
    //    console.log(req.session);
        res.json(msg);
    }
    ,(error)=>{
       res.json(msg);
    });
}); 

router.post('/checkNumber',(req,res)=>{
    const user={
        user_number: req.body.user_number,
    };
    userService.login(user).then((msg)=>{
    //    console.log(req.session);
        res.json(msg);

    }
    ,(error)=>{
       res.json(msg);
    });
});


module.exports=router;