"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionType;
(function (TransactionType) {
    TransactionType["DEBIT"] = "Debit";
    TransactionType["CREDIT"] = "Credit";
})(TransactionType || (TransactionType = {}));
class CreditCard {
    cardNumber;
    transactionLog;
    balance;
    constructor(cardNumber, balance) {
        this.cardNumber = cardNumber;
        this.balance = balance;
        this.transactionLog = [];
    }
    addLog(transactionType, amount) {
        this.transactionLog.push({ transactionType, amount });
    }
    credit(amount) {
        this.balance += amount;
        this.addLog(TransactionType.CREDIT, amount);
    }
    debit(amount) {
        this.balance -= amount;
        this.addLog(TransactionType.DEBIT, amount);
    }
    showLog(logger) {
        logger(this.transactionLog);
    }
}
exports.default = CreditCard;
