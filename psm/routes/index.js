var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
var userModel = require('../module/user');
var passModel = require('../module/password');
var pascatModel = require('../module/category');
var addPassModel = require('../module/addPassword');
/* GET home page. */

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


function checkLoginUser (req, res, next){
  try {
    var userToken = localStorage.getItem('userToken');
    var decoded = jwt.verify(userToken, 'LoginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}


router.get('/', function(req, res, next) {
  var userToken =  localStorage.getItem('userToken');
  if(userToken){
    res.redirect('/dashboard');
  }
  res.render('index', { title: 'Login', msg:'' });
});


router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var checkuser = userModel.findOne({username:username});
  checkuser.exec((err,data)=>{
    if(err) throw err;
    var getUserId = data._id;
    var getpassword = data.password;
    if(password==getpassword){
      var token = jwt.sign({ userId: getUserId }, 'LoginToken');
      localStorage.setItem('userToken',token );
      localStorage.setItem('loginUser',username );
      res.redirect('/dashboard');
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
router.get('/dashboard',checkLoginUser, function(req,res,next){
  var loginUser = localStorage.getItem('loginUser');
  res.render('dashboard',{title: 'Dashboard',loginUser });
});
router.get('/logout', function(req,res,next){
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/');
});
router.get('/addcategory',checkLoginUser, function(req,res,next){
  var loginUser = localStorage.getItem('loginUser');

  res.render('addCategory',{title: 'Add Category', loginUser, errors:''});
});


router.post('/addcategory',checkLoginUser, [check('addcategory','Empty category ').isLength({ min: 1 })], function(req,res,next){
  var loginUser = localStorage.getItem('loginUser');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.mapped())
    res.render('addCategory',{title: 'Add Category', loginUser, errors: errors.mapped()});
  }else{
    var passcat = req.body.addcategory;
    var categoryDetail = new pascatModel({
      category: passcat
    });
    categoryDetail.save(function(err, docs){
      if(err) throw err;
      res.render('addCategory',{title: 'Add Category', loginUser, errors:''});
    })
  }
});
  router.get('/mycategory', checkLoginUser,function(req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    var getpasswordcategory= pascatModel.find({});
    getpasswordcategory.exec((err, docs)=>{
      if(err) throw err;
      res.render('categoryTable',{title:'my category', msg:'', alldata:docs,loginUser:loginUser})
    });
  });
  router.get('/mycategory/delete/:id', checkLoginUser,function(req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.params.id;
    var getpasswordcategory= pascatModel.findOneAndDelete(myid);
    getpasswordcategory.exec((err, docs)=>{
      if(err) throw err;
      res.redirect('/mycategory')
    });
  });
  router.get('/mycategory/edit/:id', checkLoginUser,function(req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.params.id;
    var getpasscatedit= pascatModel.findById(myid);
    getpasscatedit.exec((err, docs)=>{
      if(err) throw err;
      res.render('editPassword',{title: 'Edit Password', data:docs, msg:'', id:myid, loginUser:loginUser, errors:''})
    });
  });

  router.post('/mycategory/edit', checkLoginUser,function(req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.body.id;
    var editcategory= req.body.editcategory;
    var passcatupdate= pascatModel.findByIdAndUpdate(myid,{category:editcategory});
    passcatupdate.exec((err, docs)=>{
      if(err) throw err;
      res.redirect('/mycategory');
    });
  });

  router.get('/mypasswords', function(req, res, next){
    
    var loginUser = localStorage.getItem('loginUser');
    var getpasswordcategory= pascatModel.find({});
    getpasswordcategory.exec((err, docs)=>{
      if(err) throw err;
      res.render('mypasswords',{title:'My Passwords', msg:'', alldata:docs,loginUser:loginUser, errors:''})
    });
    router.post('/mypasswords', function(req, res, next){
      var loginUser = localStorage.getItem('loginUser');
      var passcategory = req.body.passcat;
      var passdetails = req.body.pass_details;
      var project = req.body.project;
      var passeverything = new addPassModel ({
        password_category: passcategory,
        password_details : passdetails,
        project: project
      })
      passeverything.save((err, docs)=>{
        if (err) throw err;
        res.render('myPasswords',{title:'My Passwords', msg:'', alldata:docs,loginUser:loginUser, errors:''})
      }
      
    )})
    
  })
  router.get('/showpasswords', function(req, res, next){
    
    var loginUser = localStorage.getItem('loginUser');
    var getpassworddetails= addPassModel.find({});
    getpassworddetails.exec((err, docs)=>{
      if(err) throw err;
      res.render('showpassword',{title:'My Passwords', msg:'', alldata:docs,loginUser:loginUser, errors:'', alldata:docs})
    });
  });
  router.get('/showpasswords/delete/:id', function(req, res, next){
    
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.params.id
    var getpassworddetails= addPassModel.findByIdAndRemove(myid);
    getpassworddetails.exec((err, docs)=>{
      if(err) throw err;
      res.redirect('/showpasswords')
    });
  });

  router.get('/showpasswords/edit/:id', function(req, res, next){
    
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.params.id
    var getpassworddetails= addPassModel.findById(myid);
    getpassworddetails.exec((err, docs)=>{
      if(err) throw err;
      var getpasswordcategory= pascatModel.find({});
      getpasswordcategory.exec((err, doc)=>{
        if(err) throw err;
        res.render('editpasswordDetail',{title:'My Passwords', msg:'', alldata:doc,loginUser:loginUser,record:docs, errors:''})
      });
      
    });
  });
  router.post('/showpasswords/edit/', function(req, res, next){
    
    var loginUser = localStorage.getItem('loginUser');
    var myid = req.body.id;
    var mycategory = req.body.passcat;
    var myproject = req.body.project;
    var mydetails = req.body.pass_details;
    var setpassworddetails= addPassModel.findByIdAndUpdate(myid,{password_category:mycategory, project:myproject, password_details:mydetails});
    setpassworddetails.exec((err, doc)=>{
        if(err) throw err;
        res.redirect('/showpasswords')
      });
    });
      
 


module.exports = router;
