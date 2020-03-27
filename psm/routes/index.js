var express = require('express');
var router = express.Router();
var userModel = require('../module/user');
var passModel = require('../module/password');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login', msg:'' });
});


router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var checkuser = userModel.findOne({username:username});
  checkuser.exec((err,data)=>{
    if(err) throw err;
    var getpassword = data.password;
    if(password==getpassword){
      res.redirect('/manager');
    }
    else{
      res.render('index', { title: 'Login', msg: 'user loggedin failed' });
    }
  }) 
});


function checkEmail(req,res,next){
  var email= req.body.email;
  var check=userModel.findOne({email:email});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return  res.render('signup', { title: 'Signup', msg:'email  already exist'});
    }
    next();
  })
}

function checkUsername(req,res,next){
  var username= req.body.username;
  var check=userModel.findOne({username:username});
  check.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return  res.render('signup', { title: 'Signup', msg:'username  already exist'});
    }
    next();
  })
}
router.get('/signup', function(req, res, next) {
   res.render('signup', { title: 'Signup', msg:''});
});
router.post('/signup',checkUsername,checkEmail, function(req, res, next) {
  
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
if(password != cpassword){
  res.render('signup', { title: 'Signup', msg:'password and confirm password dosent match'})
}else{
  var userDetails = new userModel({
    username : username,
    email : email,
    password: password,
  });
  userDetails.save((err, doc)=>{
    if(err) throw err;
    res.render('signup', { title: 'Signup', msg:'successful'});
  });

}
});

router.get('/manager', function(req, res, next) {
  alldata=passModel.find({});
  alldata.exec((err,doc)=>{
    if(err) throw err;
    res.render('passwords', { title: 'Password Management',msg: '', alldata:doc });
  })
  
  
});

router.post('/manager', function(req, res, next) {
  var app_name = req.body.app_name;
  var app_username = req.body.app_username;
  var app_password = req.body.app_password;

  var passwordDetails = new passModel({
    appname: app_name,
    appusername: app_username,
    apppassword: app_password
  })
  passwordDetails.save((err, doc)=>{
    if(err) throw err;
    res.redirect('/manager');
  })
  
});

router.get('/manager/delete/:id', function(req, res, next) {
  
  var getid = req.params.id;
  var deletepassword=passModel.findByIdAndDelete(getid);
  deletepassword.exec((err)=>{
    if(err) throw err;
    res.redirect('/manager');
  })
  
 
});



module.exports = router;
