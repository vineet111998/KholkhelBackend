const express = require('express');
const router = express.Router();
const AiService =require('../services/AiService');
router.get('/', (req, res) => {
    res.send("we are on AI Api!!!!!!");
});

//Get Quiz data  fro user
router.post('/getImageFromOpenAIApi', (req, res) => {
    AiService.getImageFromOpenAIApi(req.body.textToAI).then((msg) => {
    // console.log(msg)
        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
module.exports = router
