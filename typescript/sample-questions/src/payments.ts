import Creditable from './creditable';
import Debitable from './debitable';

const payBill = (debitable: Debitable, amount: number): void => {
  debitable.debit(amount);
};

const receiveCashback = (creditable: Creditable, amount: number): void => {
  creditable.credit(amount);
};

export { payBill, receiveCashback };
