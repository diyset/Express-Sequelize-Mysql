'use strict';

let db = require('../config/mysql_config');
let MemberRepo = require('../repository/member_repository');
let Member = require('../domains/member');

let index = (req, res, next)=>{

    res.render('index',{'title':'Index Page'})
};

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
    res.redirect('/index_login');
};

module.exports={
    index:index,
    index_login:index_login,
    login:login,
    myProfile:myProfile,
    logout:logout
};
