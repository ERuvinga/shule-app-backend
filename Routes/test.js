// roote for test Api 

const router = require('express').Router();
const userShema = require('../Models/test');

router.use('/', (req, res) => { // fecting user of Test Api
// CREATe USER in test collection
    // let datas = {
    //     name: "Elie Ruvinga",
    //     email: "ruvingaelie@gmail.com",
    //     password: "*****"
    // };

    // const user = new userShema({
    //     ...datas
    // });

    // user.save().then(dataOfUser => console.log(dataOfUser))
    //                 .catch(error => console.log(error));
    // res.json(datas);
    // res.status(200);

// GET Users of user_test collection
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