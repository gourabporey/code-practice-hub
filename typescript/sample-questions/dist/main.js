"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const credit_card_1 = __importDefault(require("./credit-card"));
const payments_1 = require("./payments");
const main = () => {
    const creditCard = new credit_card_1.default('3456-6789', 10000);
    (0, payments_1.payBill)(creditCard, 1000);
    creditCard.showLog(console.log);
};
main();
