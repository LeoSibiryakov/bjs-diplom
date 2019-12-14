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

    convertation({fromCurrency, targetCurrency, targetAmount}, callback) {
        return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount},
            (err,data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err,data);
        });
    }

    moneyTransfer({to,amount},callback) {
        return ApiConnector.transferMoney({to,amount},
            (err,data) => {
            console.log(`Transferring ${amount} NETCOIN to ${to}`);
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

    const addAmount = {currency: 'EUR', amount: 100};

    getStocks((err, data) => {
        if (err) {
          console.log('Error during getting stocks');
        }
          
        const getStock = data[99];

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
                    Leonid.addMoney(addAmount,(err,data) => {
                        if(err) {
                            console.log(`Error adding money`)
                        } else {
                            console.log(`Successful added ${addAmount.amount} ${addAmount.currency} to ${Leonid.username}`); 

                            const getConvertAmount = getStock['EUR_NETCOIN']*addAmount.amount;

                            Leonid.convertation({fromCurrency: addAmount.currency,targetCurrency: 'NETCOIN',targetAmount:getConvertAmount},(err,data) => {
                                if(err) {                                                                                 
                                    console.log(`Error process converting money`)
                                } else {
                                    console.log(`Successful converting ${addAmount.amount} ${addAmount.currency} to ${getConvertAmount} NETCOIN`);
                                    Gerda.addNewUser((err,data) => {
                                        if (err) {
                                            console.log(`Error creating new user`)
                                            console.log(err)
                                        } else {
                                            console.log(`${Gerda.username} is created`);
                                            Leonid.moneyTransfer({to:Gerda.username,amount:getConvertAmount},(err,data) => {
                                                if(err) {
                                                console.log(`Error transfer money`)
                                            } else {
                                                console.log(`Successful transfer ${getConvertAmount} NETCOIN to ${Gerda.username}`)
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
})
}
main();