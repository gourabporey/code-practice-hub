import CreditCard from './credit-card';
import { payBill } from './payments';

const main = (): void => {
  const creditCard = new CreditCard('3456-6789', 10000);
  payBill(creditCard, 1000);
  creditCard.showLog(console.log);
};

main();
