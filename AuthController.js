var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
var User = require('./user/User')
var bcrypt = require('bcryptjs');
var config = require('./config');
var jwt = require('jsonwebtoken')

router.post('/register',function (req,res) {
    var hashedPassword = bcrypt.hashSync(req.body.password,8)
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    }, function (err, user) { 
        if (err) return res.status(500).send("Problem registering")
        // bikin token
        //console.log("Bikin Token")
        var token = jwt.sign({id:user._id},config.secret, {
            expiresIn : 1
        })
        res.status(200).send({registered: true})

     })

})

router.get("/validate", function(req,res){
    var token = req.headers["x-access-token"]
    if(!token) return res.status(401).send({auth:false,message:"Unathorized"})

    jwt.verify(token,config.secret,function(err,decoded){
        if (err) return res.status(500).send({auth:false,message:"Error to auth Token"})
        userName = req.headers['username']
        User.findOne({name : userName},function(err,user){
            console.log(user)
        })

        res.status(200).send({auth:true})
    })

})

router.post('/login',function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err) return res.status(500).send("Server Error")
        if(!user) return res.status(404).send("not Found")

        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
        if(!passwordIsValid) return res.status(401).send({auth: false,token:null,message:"Unathorized"})

        var token = jwt.sign({id:user._id}, config.secret,{
            expiresIn:3600
        })

        res.status(200).send({auth:true,token:token})

    })
})


router.get('/logout',function(req,res){
    res.status(200).send({auth:false, token:null})
})

module.exports = router
