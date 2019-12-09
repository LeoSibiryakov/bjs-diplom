"use strict"

class profile {
    constructor({username,name,password}) { // Или лучше сделать так - { username, name: { firstName, lastName }, password})
        this.login = username;
        this.name = name; // И соответственно так this.name = { firstName, lastName}; ?
        this.password = password;
    }

    newUser(callback) {
        // console.log(`Add ${this.login}`);  - можно без этого?
        return ApiConnector.createUser({
            username: this.login,
            name: this.name,
            password: this.password
        },
        (err,data) => {
            console.log(`Add user ${this.login}`);
            callback(err,data); // Правильно ли выполен весь метод,или где-то нужно исправлять? 
        }
        ); // по такому же принципу делаются остальные методы? И затем пишется функция возврата.
    }