const express = require('express');
const router = express.Router();
const quizService = require('../services/quizService');
const gameService = require('../services/gameService');
const tilesService = require('../services/tilesService');
const themeService = require('../services/themeService');
const testService = require('../services/testService');
const artifactService = require('../services/artifactService');
const eventService =require('../services/eventService');
const gradeService =require('../services/gradeService');
router.get('/', (req, res) => {
    res.send("we are on getQuiz!!!!!!");
});
//Get Quiz data  fro user
router.post('/setQuiz', (req, res) => {
    const quizInfo = {
        mqi_question: req.body.mqi_question,
        mqi_options: req.body.mqi_options,
        mqi_answer: req.body.mqi_answer
    };
    quizService.setQuiz(quizInfo).then((msg) => {

        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
//          Request for tiles
router.post('/setTiles', (req, res) => {
//console.log("hello world");
    const tiles = {
        // tile_code: req.body.tile_code,
        tile_desc: req.body.tile_desc,
         tile_gameData: req.body.tile_gameData,//only for multilingual
        tile_type: req.body.tile_type,
        tile_game_info: req.body.tile_game_info,
        tile_artifact_info: req.body.tile_artifact_info,
        event_type_id:req.body.event_type_id,
        tile_grade_id: req.body.tile_grade_id,
        tile_start_date: req.body.event_start,
        tile_end_date: req.body.event_end,
        tile_user_id: req.body.user_id
    };
    // console.log(tiles);
    tilesService.setTiles(tiles).then((msg) => {
    // console.log(msg)
        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
//      GameInfo
router.post('/gameInfo', (req, res) => {
    const game = {
        game_type_id: req.body.game_type_id,
        game_attr: req.body.game_attr,
        game_artifact: req.body.game_artifact,
        game_answer_status: req.body.game_answer_status,
        game_desc: req.body.game_desc,
        master_game_type_id:req.body.master_game_type_id,
        status_id:req.body.status_id
    };
    gameService.setGame(game).then((msg) => {

        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
//          GaneType
router.post('/gameType', (req, res) => {
    const gameType = {
        game_name: req.body.game_name,
        game_desc: req.body.game_desc,
        game_status:req.body.game_status,
        master_game_type_id:req.body.master_game_type_id

    };
    gameService.setGameType(gameType).then((msg) => {

        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
//          TileType
router.post('/setTilesType', (req, res) => {
    const getTilesType = {
        tile_name: req.body.learning_name,
        tile_desc: req.body.learning_desc,
        tile_attr: req.body.learning_attr
    };
    tilesService.setTilesType(getTilesType).then((msg) => {

        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});
//          theme
router.post('/addTheme', (req, res) => {
    const getTheme = {
        theme_name: req.body.theme_name,
        theme_primary_color: req.body.theme_primary_color,
        theme_secondary_color: req.body.theme_secondary_color,
        theme_tertiary_color: req.body.theme_tertiary_color,
        theme_qoute: req.body.theme_qoute,
        theme_logo: req.body.theme_logo,
        theme_start_date: req.body.theme_start_date,
        theme_end_date: req.body.theme_end_date
    };
    themeService.setTheme(getTheme).then((msg) => {

        res.json(msg);

    }, (error) => {
        res.json(msg);
    });
});

router.get('/getCurrentTiles', (req, res) => {
    tilesService.getTilesToStartGame().then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});

router.get('/getTest', (req, res) => {

    testService.getAllTest().then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
})
router.post('/getGameType', (req, res) => {
    var data={};
    if(Object.keys(req.body).length >1)
    {
        data={
            game_status:req.body.game_status,
            master_game_type_id:req.body.master_game_type_id
        }
    }
    else if(Object.keys(req.body).length ==1){
        data={
            master_game_type_id:req.body.master_game_type_id
        }
    }
    gameService.getGameType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getWordInfo', (req, res) => {
    const data={
        word_length:req.body.word_length,
        word_attr:req.body.word_attr
    }
    gameService.getWordInfo(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getWordInfoByLength', (req, res) => {
    const data={
        word_length:req.body.word_length,
        word_attr:req.body.word_attr
    }
    gameService.getWordInfoByLength(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getWordInfoByLengthAttr', (req, res) => {
    const data={
        word_length:req.body.word_length,
    }
    gameService.getWordInfoByLength(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getGameInfo', (req, res) => {
    var data={};
    if(Object.keys(req.body).length ==1){
    data={
        master_game_type_id:req.body.master_game_type_id
    }
    }
    gameService.getGameInfo(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getLearningInfo', (req, res) => {
    tilesService.getTilesType().then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getPicture', (req, res) => {
    const fileInfo = {
        artifact_name: req.body.artifact_name,
        artifact_location: req.body.artifact_location
    };
    artifactService.pictureUpload(fileInfo).then((msg) => {
        res.json(msg);
    },
        (err) => {
            res.json(err);
        })
});
router.post('/getArtifact', (req, res) => {
    artifactService.getArtifact().then((msg) => {
        res.json(msg);
    },
        (err) => {
            res.json(err);
        })
})
router.post('/getActivityList', (req, res) => {
    const data = {
        tile_type_id: req.body.tile_type_id,
    };
    tilesService.getActivityList(data).then((msg) => {
        res.json(msg);
    },
        (err) => {
            res.json(err);
        })
})
router.post('/getAllTiles', (req, res) => {
    tilesService.getAllTiles().then((msg) => {
        res.json(msg);
    },
        (err) => {
            res.json(err);
        })
});
router.post('/setStatus',(req,res)=>{
    const data={
        status_code:req.body.status_code,
        status_desc:req.body.status_desc
    };
    gameService.setStatus(data).then((msg)=>{
        res.json(msg);
    },
    err=>{
        res.json(err);
    })
});

router.post('/getStatus',(req,res)=>{
    var data={};
    if(Object.keys(req.body).length==1){
    data={
        status_code:req.body.status_code
    }
    }
    gameService.getStatus(data).then((msg)=>{
        res.json(msg);
    },
    err=>{
        res.json(err);
    })
});

router.post('/setTypeOfGame',(req,res)=>{
    var data={
        master_game_type_name:req.body.master_game_type_name,
        master_game_type_desc:req.body.master_game_type_desc,
        master_game_type_status:req.body.master_game_type_status
    };
    gameService.setMasterGameType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
})

router.post('/getTypeOfGame',(req,res)=>{
    var data={
        master_game_type_status:req.body.master_game_type_status
    };
    gameService.getMasterGameType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
});

router.post('/setTypeOfEvent',(req,res)=>{
    var data={
        master_event_type_name:req.body.master_event_type_name,
        master_event_type_desc:req.body.master_event_type_desc,
        master_event_type_status:req.body.master_event_type_status
    };
    eventService.setEventType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
})
router.post('/getTypeOfEvent',(req,res)=>{
    var data={
        master_event_type_status:req.body.master_event_type_status
    };
    eventService.getEventType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
})

router.post('/setGrade',(req,res)=>{
    var data={
        grade_code:req.body.grade_code,
    };
    gradeService.setGrade(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
})

router.post('/getGrade',(req,res)=>{
//    var data={
//        grade_code:req.body.grade_code,
//    };
// console.log("hello");
    gradeService.getGrade().then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
});

router.post('/getEventbyGrade',(req,res)=>{
   var data={
       tile_grade_id:req.body.tile_grade_id,
   };
    // console.log("data");
   tilesService.getEventbyGrade(data).then((msg) => {
       res.json(msg);
   }, (error) => {
       res.json(msg);
   });
});

router.post('/getEventbyUserid',(req,res)=>{
    var data={
        tile_user_id:req.body.tile_user_id,
    };
    console.log(data)
     tilesService.getEventbyUserid(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});

router.post('/setEventbyid',(req,res)=>{
    // console.log(req.body);
    tilesService.setEventbyid(req.body).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(msg);
    });
 });

 router.post('/getGameTypeByID',(req,res)=>{
    var data={
        game_type_id:req.body.game_type_id,
    };
    //  console.log(req.body);
     gameService.getGameType(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});
router.post('/getEventbyid',(req,res)=>{
    var data={
        tile_id:req.body.tile_id,
    };
    console.log(data)
     tilesService.getEventbyid(data).then((msg) => {
        res.json(msg);
    }, (error) => {
        res.json(error);
    });
});

module.exports = router
