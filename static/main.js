"use strict"

class profile {
    constructor({username,name: {firstName, lastName},password}) { 
        this.login = username;
        this.name = {firstName, lastName};
        this.password = password;
    }

    addNewUser(callback) {
        return ApiConnector.addNewUser({
            username: this.login,
            name: this.name,
            password: this.password
        },
            (err,data) => {
            console.log(`Add user ${this.login}`);
            callback(err,data);
        });
    }

    authorization(callback) {
        return ApiConnector.authorization({
            username: this.username,
            password: this.password 
        },
            (err,data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err,data);
        });
    }

    addMoney({currency, amount}, callback) {
        return ApiConnector.addMoney({currency, amount}, 
            (err, data) => {
            console.log(`Added ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertation({ofCurrency,inCurrency,targetAmount}, callback) {
        return ApiConnector.convertation({ofCurrency,inCurrency,targetAmount}),
            (err,data) => {
            console.log(`Converting ${ofCurrency} to ${targetAmount} ${inCurrency}`);
            callback(err,data);
        };
    }

    moneyTransfer({whom,amount},callback) {
        return ApiConnector.moneyTransfer({whom,amount}),
            (err,data) => {
            console.log(`Transferring ${amount} to ${whom}`);
            callback(err,data);
        };
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err,data) => {
        console.log(`Getting stocks`);
    });
}

/* Сделал методы по подобию примера в задании, посмотрите пожалуйста,все ли правильно?
и по последней функции  - её нужно сохранить в переменную, типа let someName = getStocks и потом использовать где-то дальше?
*/