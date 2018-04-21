'use strict';

let db = require('../config/mysql_config');
let StudentRepo = require('../repository/student_repository');
let Student = require('../domains/student');

let saveStudentShowForm = (req, res, next)=>{
    res.render('new_student',{'title': 'Tambahkan Data Student'});
};

let saveStudent = (req, res, next)=>{
    if(!req.body){
        next('Harap isi semua fields!');
    }
    let data = req.body;
    let student = new Student(data.nim, data.nama, data.kelas, parseFloat(data.ipk));
    let studentRepo = new StudentRepo(db);
    studentRepo.save(student, result=>{
        res.redirect('/');
    }, err=>{
        if(err){
            next(err);
        }
    });
}

let updateStudent = (req, res, next)=>{
    if(!req.body){
        next('Harap isi semua fields!');
    }
    let data = req.body;
    let student = new Student(data.nim, data.nama, data.kelas, parseFloat(data.ipk));
    let studentRepo = new StudentRepo(db);
    studentRepo.update(student, result=>{
        res.redirect('/');
    }, err=>{
        next(err);
    });
};
let updateStudentShowForm = (req, res, next)=>{
    let nim = req.params.nim;
    if(!req.params){
        next('Harap Isi Data');
    }
    if(!nim){
        next(nim+' Nim Tidak Ditemukan');
    }
    let studentRepo = new StudentRepo(db);
    studentRepo.findOne(nim, result=>{
        res.render('update_student',{'student':result,'title':'Update Student'});
    }, err=>{
        if(err){
            next(err);
        }
    });
};

let deleteStudent = (req, res, next)=>{
    let nim = req.params.nim
    if(!nim){
        next(nim+' Nim Tidak Ditemukan');
    }
    if(!req.params){
        next('Harap Isi Data');
    }
    let studentRepo = new StudentRepo(db);
    studentRepo.delete(nim, result=>{
        res.redirect('/');
    },err =>{
        if(err){
            next(err);
        }
    });
};

let getStudent = (req, res, next)=>{
        let nim = req.params.nim;
        if(!nim){
            next(nim+' Nim Tidak Ditemukan');
        }
        if(!req.params){
            next('Harap Isi Data');
        }
        let studentRepo = new StudentRepo(db);
        studentRepo.findOne(nim, result=>{
            res.render('student_detail',{'student':result,'title': 'Student Detail'});
        }, err=>{
            if(err){
                next(err);
            }
        });
};

let getAllStudents = (req, res, next)=>{
    let studentRepo = new StudentRepo(db);
    
    studentRepo.findAll(results=>{
        res.render('index',{'students':results,'title':'Get All Students'});
    }, err=>{
        if(err){
            next(err);
        }
    });
};

module.exports = {
    saveStudent: saveStudent,
    saveStudentShowForm: saveStudentShowForm,
    getStudent: getStudent,
    getAllStudents: getAllStudents,
    updateStudentShowForm: updateStudentShowForm,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
}