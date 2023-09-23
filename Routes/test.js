// roote for test Api 

const router = require('express').Router();
const userShema = require('../Models/test');

router.use('/', (req, res) => { // fecting user of Test Api
    userShema.find()
    .then(allUsers => {
         datas = {...allUsers};
         res.json(datas);
         res.status(200);
    })
    .catch((error)=> {
        console.log(error);
        res.json({message:"Error server"});
        res.status(200);
    });

});


module.exports = router;