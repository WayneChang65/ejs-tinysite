'use strict';
const fs = require('fs');
const fmlog = require('@waynechang65/fml-consolelog').log;
const sysmsg = require('./sysmsg.json');
const usersFileWithPath = './users.json';
const gUsers = require(usersFileWithPath);

function _getAllUsers() {
    if (!gUsers) throw new Error(sysmsg.USERS_DB_EMPTY);
    else return gUsers;
}

function _addUser(user) {
    _getAllUsers().push(user);
    return this;
}

function _getUserById(userId) {
    let users = _getAllUsers();
    return users.find(item => item.id === userId);
}

function _getUserByName(userName) {
    let users = _getAllUsers();
    return users.find(item => item.name === userName);
}

function _getUserByEmail(userEmail) {
    let users = _getAllUsers();
    return users.find(item => item.email === userEmail);
}

function _save() {
    fs.writeFile(usersFileWithPath, JSON.stringify(gUsers), function(err){
		if(err) throw err;
        fmlog('sys_msg', ['DB-SAVE', `${usersFileWithPath} saved.`]);
	});
}

module.exports = {
    getAllUsers : _getAllUsers,
    addUser : _addUser,
    getUserById: _getUserById,
    getUserByName: _getUserByName,
    getUserByEmail: _getUserByEmail,
    save : _save
}