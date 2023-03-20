const express= require('express');
const router=express.Router();
const langService =require('../services/multiLinguinal');
router.get('/', (req,res)=>{
    res.send("Multi-Linguinal Service");
})
router.post('/addLang',(req,res)=>{
    const langData={
        lang_name: req.body.lang_name,
        lang_desc: req.body.lang_desc,
        lang_status:req.body.lang_status,
        lang_color:req.body.lang_color
    };
    langService.addLang(langData).then((msg)=>{
        res.json(msg);
    },(error)=>{
       res.json(msg);
    });
});

router.post('/getLang',(req,res)=>{
    const langData={
        lang_status:req.body.lang_status
    };
    langService.getLang(langData).then((msg)=>{
        res.json(msg);
    },(error)=>{
       res.json(msg);
    });
});

module.exports=router;