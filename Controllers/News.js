const ModelNews = require("../Models/News");

// Controller Newpay
exports.NewsPub = (req, res)=>{
    console.log(req.body);
    const newPublication = new ModelNews({
        title:req.body.Title,
        Content:req.body.content,
        time:req.body.time
    });

    newPublication.save()
    .then((datas)=> {
        console.log(datas);
        res.status(200).json({msg:"Nouvelle Information Enregistrer!"})
    })
    .catch((error)=> res.status(500).json({msg:"Error lors des L'Enregistrement"}))
};

exports.getAllPub = (re, res)=>{
    ModelNews.find()
    .then((allNews=>{
        res.status(200).json({News:allNews});
    }))
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}

