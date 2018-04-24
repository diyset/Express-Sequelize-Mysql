'use strict';

let Member = function(id, email, password, full_name){
    this.id=id;
    this.email=email;
    this.password=password;
    this.full_name=full_name;
};

Member.prototype.isValidPassword = function(password){
    return this.password === password;
};

module.exports = Member;