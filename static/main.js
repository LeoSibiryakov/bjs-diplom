"use strict"

class Profile {
    constructor({username,name: {firstName, lastName},password}) { 
        this.username = username;
        this.name = {firstName, lastName};
        this.password = password;
    }

    addNewUser(callback) {
        return ApiConnector.createUser({
            username: this.username,
            name: this.name,
            password: this.password
        },
            (err,data) => {
            console.log(`Creating user ${this.username}`);
            callback(err,data);
        });
    }

    authorization(callback) {
        return ApiConnector.performLogin({
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
            console.log(`Added ${amount} ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertation({ofCurrency,inCurrency,targetAmount}, callback) {
        return ApiConnector.convertMoney({ofCurrency,inCurrency,targetAmount},
            (err,data) => {
            console.log(`Converting ${ofCurrency} to ${targetAmount} ${inCurrency}`);
            callback(err,data);
        });
    }

    moneyTransfer({whom,amount},callback) {
        return ApiConnector.transferMoney({whom,amount},
            (err,data) => {
            console.log(`Transferring ${amount} to ${whom}`);
            callback(err,data);
        });
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err,data) => {
        console.log(`Getting stocks info`);
        callback(err, data);
    });
}

function main() {
    const Leonid = new Profile({ 
        username:'Leonid',
        name:{firstName:'Leonid',lastName:'Sibiryakov'},
        password:'qwerty',
    });
    const Gerda = new Profile({
        username:'Gerda',
        name:{firstName:'Gerda',lastName:'Dog'},
        password:'spaniel',
    });

    Leonid.addNewUser((err,data) => {
        if (err) {
            console.log(`Error creating new user`)
        } else {
            console.log(`${Leonid.username} is created`);
            Leonid.authorization((err,data) => {
                if(err) {
                    console.log(`Error process authorization`)
                } else {
                    console.log(`${Leonid.username} is authorizing`);
                    Leonid.addMoney({currency: 'EUR', amount:100},(err,data) => {
                        if(err) {
                            console.log(`Error adding money`)
                        } else {
                            console.log(`Successful added ${amount} ${currency} to ${Leonid.username}`);
                            /*на этом месте функция ломается и выдает ошибку. 
                            https://prnt.sc/q9zd68
                            Причем сначала у меня получилось,а потом я что-то поменял и больше никак.
                            И в конвертации тоже пытался но не получилось. Где искать,куда смотреть?=)
                            */ 
                            Leonid.convertation({ofCurrency,inCurrency,targetAmount},(err,data) => {
                                if(err) {                                                                                 
                                    console.log(`Error process converting money`)
                                } else {
                                    console.log(`Successful converting ${targetAmount} ${ofCurrency} to ${inCurrency}`);
                                    Gerda.addNewUser((err,data) => {
                                        if (err) {
                                            console.log(`Error creating new user ${this.username}`)
                                        } else {
                                            console.log(`${username} is created`);
                                            Leonid.moneyTransfer({whom:'Leonid',amount:'100'},(err,data) => {
                                                if(err) {
                                                console.log(`Error transfer money`)
                                            } else {
                                                console.log(`Successful transfer ${amount} to ${whom}`)
                                            }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
        }
    });
}
main();