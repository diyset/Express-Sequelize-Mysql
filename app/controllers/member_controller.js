'use strict';

let db = require('../config/mysql_config');
let MemberRepo = require('../repository/member_repository');
let Member = require('../domains/member');
const bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);


let index = (req, res, next)=>{

    res.render('index',{'title':'Index Page'})
};

let signupForm = (req, res, next)=>{
    res.render('signup',{'title': 'Signup Page'});
};

let signup = (req, res, next)=>{
    if(!req.body){
        next('Harap isi semua fields!');
    }
    let data = req.body;
    let member = new Member(data.id, data.email, data.password, data.full_name);
    let memberRepo = new MemberRepo(db);    
    memberRepo.save(member, result=>{
        res.redirect('/');
    }, err=>{
        if(err){
            next(err);
        }
    });
}

let index_login = (req, res, next)=>{
    let profile = req.user;
    res.render('index_login',{'title':'Index Page','profile':profile})
};

let login = (req, res, next)=>{
    res.render('login',{'title':'Login','message': req.flash('message')[0]});
};

let myProfile = (req, res, next)=>{
    let profile = req.user;
    res.render('profile',{'title':'My Profile','profile': profile});
 
};

let logout = (req, res, next)=>{
    req.logout;
    res.redirect('/login');
};

module.exports={
    index:index,
    index_login:index_login,
    login:login,
    myProfile:myProfile,
    logout:logout,
    signup:signup,
    signupForm:signupForm
};
