'use strict';

let Student = require('../domains/student');

let StudentRepository = function(db){
    this.db = db;
};

StudentRepository.prototype = {
    save: function(s, cb, errCb){
        let db = this.db;
        let data = {nim: s.nim, nama: s.nama, kelas: s.kelas, ipk: s.ipk};
        let query = 'INSERT INTO student SET ?';
        db.query(query, data, (err, results)=>{
            if(err){
                errCb(err);
            }
            cb(results);
        });

    },
    update: function(s, cb, errCb){
        let db = this.db;
        let data = [s.nama, s.kelas, s.ipk, s.nim];
        let query = 'UPDATE student SET nama = ?, kelas = ?, ipk = ? WHERE nim = ?';
        db.query(query, data, (err, results)=>{
            if(err){
                errCb(err);
            }
            cb(results);
        });
    },
    delete: function(nim, cb, errCb){
        let db = this.db;
        let query = 'DELETE FROM student WHERE nim = ?';
        db.query(query, [nim], (err, results)=>{
            if(err){
                errCb(err);
            }
            cb(results);
        });
    },
    findOne: function(nim, cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM student WHERE nim = ?';
        db.query(query, [nim], (err, results, fields)=>{
            if(err){
                next(err);
            }
            if(!results){
                cb('Data dengan code ${nim}, tidak ditemukan');
            } else {
                let s = results[0];
                let student = new Student(s.nim, s.nama, s.kelas, s.ipk);
                cb(student);
            }
        });
    },
    findAll: function(cb, errCb){
        let db = this.db;
        let query = 'SELECT * FROM student';
        db.query(query, (err, results, fields)=>{
            if(err){
                errCb(err);
            }
            if(!results){
                cb('Data Kosong!');
            }else{
                let studentArray = [];
                for(let i = 0;i<results.length; i++){
                    let s = results[i];
                    let student = new Student(s.nim, s.nama, s.kelas, s.ipk);
                    studentArray.push(student);
                } 
                cb(studentArray);
            }
        });
    }
};
module.exports = StudentRepository;