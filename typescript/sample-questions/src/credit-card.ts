import Creditable from './creditable';
import Debitable from './debitable';

enum TransactionType {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

type Log = {
  transactionType: TransactionType;
  amount: number;
};

export default class CreditCard implements Creditable, Debitable {
  private readonly cardNumber: string;
  private readonly transactionLog: Log[];
  private balance: number;

  constructor(cardNumber: string, balance: number) {
    this.cardNumber = cardNumber;
    this.balance = balance;
    this.transactionLog = [];
  }

  private addLog(transactionType: TransactionType, amount: number): void {
    this.transactionLog.push({ transactionType, amount });
  }

  credit(amount: number): void {
    this.balance += amount;
    this.addLog(TransactionType.CREDIT, amount);
  }

  debit(amount: number): void {
    this.balance -= amount;
    this.addLog(TransactionType.DEBIT, amount);
  }

  showLog(logger: (transactionLog: Log[]) => void): void {
    logger(this.transactionLog);
  }
}
