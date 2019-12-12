"use strict"

class Profile {
    constructor({username,name: {firstName, lastName},password}) { 
        this.login = username;
        this.name = {firstName, lastName};
        this.password = password;
    }

    addNewUser(callback) {
        return ApiConnector.createUser({
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
            console.log(`Added ${amount} of ${currency} to ${this.username}`);
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
        console.log(`Getting stocks`);
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
            console.log(`Error creating new user ${Leonid.username}`)
        } else {
            console.log(`${Leonid.username} is created`);
            Leonid.authorization((err,data) => {
                if(err) {
                    console.log(`Error process authorization`)
                } else {
                    console.log(`${username} is created`);
                    Leonid.addMoney({currency:'EUR',amount:'100'},(err,data) => {
                        if(err) {
                            console.log(`Error adding money`)
                        } else {
                            console.log(`Successful added ${amount} ${currency}`);
                            Leonid.convertation({ofCurrency:'EUR',inCurrency:'NETCOIN',targetAmount:'100'},(err,data) => { /* как применить функцию получения куса валют с сервера ? */
                                if(err) {                                                                                 
                                    console.log(`Error process converting money`)
                                } else {
                                    console.log(`Successful converting ${targetAmount} ${ofCurrency} to ${inCurrency}`);
                                    Gerda.addNewUser((err,data) => {
                                        if (err) {
                                            console.log(`Error creating new user ${username}`)
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

// Уфф... //