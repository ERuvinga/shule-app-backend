
// model 
const modelDatesPro = require('../Models/Proclammations')

// Search Dates 
exports.getAllDatesProclammation = (req, res) =>{      
    modelDatesPro.find() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "Dates Trouvees",DATES: datas});
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};

// Updating Dates 
exports.UpdateDateProclammation = (req, res) =>{      
    const datasPeriode ={
        ...req.body
    };

    modelDatesPro.updateOne({namePeriode:req.body.namePeriode},datasPeriode) // saving new objet in data base
    .then(()=> {
        res.status(200);
        res.json({message: "'success': Date Updated"});
    })

    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};