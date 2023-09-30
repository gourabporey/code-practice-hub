"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveCashback = exports.payBill = void 0;
const payBill = (debitable, amount) => {
    debitable.debit(amount);
};
exports.payBill = payBill;
const receiveCashback = (creditable, amount) => {
    creditable.credit(amount);
};
exports.receiveCashback = receiveCashback;
